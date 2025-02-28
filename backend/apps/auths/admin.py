from django.contrib import admin
from .models import CustomUser

@admin.register(CustomUser)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'nickname', 'date_of_birth',)
    search_fields = ('email','id' ,'nickname')
    ordering = ('id',)
    readonly_fields = ('datetime_joined',)

