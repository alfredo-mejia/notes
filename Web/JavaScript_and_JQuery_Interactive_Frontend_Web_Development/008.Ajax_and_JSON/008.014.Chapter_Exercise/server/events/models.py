from django.db import models

# Create your models here.
class Event(models.Model):
    date = models.DateField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    capacity = models.IntegerField()
    map_url = models.URLField(default='')

    def __str__(self):
        return f"{self.city} {self.state} {self.country} on {self.date}"

    class Meta:
        db_table = "EVENTS"

class Session(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='sessions')
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_time = models.TimeField()

    def __str__(self):
        return f"${self.title} at {self.event.city} on ${self.event.date} {self.start_time}"

    class Meta:
        db_table = "SESSIONS"