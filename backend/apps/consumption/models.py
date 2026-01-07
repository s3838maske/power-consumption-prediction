from django.db import models
from django.conf import settings

class ConsumptionData(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    device_name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    date = models.DateField()
    consumption = models.FloatField()  # kWh
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

class Prediction(models.Model):
    TYPE_CHOICES = (
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    predicted_value = models.FloatField()
    actual_value = models.FloatField(null=True, blank=True)
    accuracy = models.FloatField(null=True, blank=True)
    model_used = models.CharField(max_length=50)
    target_date = models.DateField()
    
    timestamp = models.DateTimeField(auto_now_add=True)
