from django.contrib import admin
from .models import (
    Rating,
    University,
    Comment
)

@admin.register(Rating)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'university', 'rating', 'datetime_created',)
    search_fields = ('author', 'university','rating')
    ordering = ('id',)
    readonly_fields = ('datetime_created', 'datetime_updated')
    
admin.site.register(University)
admin.site.register(Comment)
