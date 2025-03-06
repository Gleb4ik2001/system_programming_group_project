from django.contrib import admin
from .models import (
    University,
    Comment,
    City
)

admin.site.register(University)
admin.site.register(Comment)
admin.site.register(City)
