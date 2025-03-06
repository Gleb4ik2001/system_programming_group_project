from django.urls import path
from .views import University_list, University_comments 

urlpatterns = [
    path('api/university-list/', University_list, name='university_list'),
    path('api/comments/<int:university_id>', University_comments, name='university_comments'),
]
