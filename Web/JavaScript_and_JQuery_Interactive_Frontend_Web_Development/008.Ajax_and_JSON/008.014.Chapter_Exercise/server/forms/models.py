from django.db import models

# Create your models here.
class Form(models.Model):
    name = models.CharField(max_length=255)
    message = models.TextField()

    def __str__(self):
        return self.name + " " + self.message

    class Meta:
        db_table = "FORMS"