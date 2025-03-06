from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auths/',include('auths.urls'),name='auths_views'),
    path('university/', include('main.urls'), name='university_views')
]
