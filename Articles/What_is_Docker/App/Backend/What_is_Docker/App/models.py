from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=100)
    dob = models.DateField()
    timestamp = models.DateTimeField(auto_now_add=True)