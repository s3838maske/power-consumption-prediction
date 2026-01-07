from django.db.models import Sum, Avg, Max
from rest_framework import views
from rest_framework.response import Response
from .models import ConsumptionData
from datetime import datetime, timedelta

class DashboardStatsView(views.APIView):
    def get(self, request):
        user = request.user
        last_30_days = datetime.now() - timedelta(days=30)
        
        # Aggregate stats
        stats = ConsumptionData.objects.filter(user=user, date__gte=last_30_days).aggregate(
            total=Sum('consumption'),
            avg=Avg('consumption'),
            peak=Max('consumption')
        )
        
        # Device breakdown
        device_breakdown = ConsumptionData.objects.filter(user=user, date__gte=last_30_days).values('device_name').annotate(
            consumption=Sum('consumption')
        ).order_by('-consumption')
        
        # Daily usage for line chart
        daily_usage = ConsumptionData.objects.filter(user=user, date__gte=last_30_days).values('date').annotate(
            consumption=Sum('consumption')
        ).order_by('date')

        return Response({
            'totalConsumption': stats['total'] or 0,
            'avgDailyConsumption': stats['avg'] or 0,
            'peakConsumption': stats['peak'] or 0,
            'predictedNextMonth': (stats['avg'] or 0) * 30, # Simple baseline prediction
            'deviceBreakdown': [{'deviceName': d['device_name'], 'consumption': d['consumption']} for d in device_breakdown],
            'dailyData': [{'date': d['date'].strftime('%Y-%m-%d'), 'consumption': d['consumption']} for d in daily_usage]
        })
