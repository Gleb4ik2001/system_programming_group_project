from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    """Сериализатор для модели пользователя"""
    class Meta:
        model = User
        fields = ('id', 'email', 'nickname', 'date_of_birth', 'is_verified')

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Кастомный токен-сериализатор, добавляющий данные пользователя"""
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['nickname'] = user.nickname
        return token
