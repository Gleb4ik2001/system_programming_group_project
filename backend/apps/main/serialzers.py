from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *



class City_serial(serializers.ModelSerializer):
      class Meta:
        model = City
        fields = "__all__"

class Comment_serial(serializers.ModelSerializer):
      class Meta:
        model = Comment
        fields = "__all__"

class University_serial(serializers.ModelSerializer):
      class Meta:
        model = University
        fields = "__all__"


class UniverityRating_serial(serializers.ModelSerializer):
    class Meta:
        model = University
        fields =["id" , "title", "rating","logo"]