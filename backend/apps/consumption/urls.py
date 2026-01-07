from django.urls import path
from .views import UploadConsumptionView
from .stats_views import DashboardStatsView
from .prediction_views import PredictionView

urlpatterns = [
    path('upload-data/', UploadConsumptionView.as_view(), name='upload-data'),
    path('dashboard-stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('predictions/', PredictionView.as_view(), name='predictions'),
]
