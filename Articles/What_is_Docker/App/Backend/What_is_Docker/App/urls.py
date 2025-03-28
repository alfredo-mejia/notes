from django.urls import path

from App import views

app_name = 'App'
urlpatterns = [
    path('register/', views.register, name='register'),
    path('get_all/', views.get_all, name='get_all'),
    path('delete/<int:person_id>/', views.delete, name='delete'),
    path('modify/<int:person_id>/', views.modify, name='modify'),
]