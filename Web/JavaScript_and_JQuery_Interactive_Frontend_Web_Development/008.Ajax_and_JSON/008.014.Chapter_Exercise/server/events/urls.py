from django.urls import path

from events import views

app_name='events'
urlpatterns = [
    path('', views.index, name='index'),
    path('schedule', views.schedule, name='schedule'),
    path('session', views.session, name='session'),
]