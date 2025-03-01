from rest_framework.generics import(
    CreateAPIView,
    RetrieveAPIView
)
from rest_framework.permissions import(
    AllowAny,
    IsAuthenticated
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .models import CustomUser
from .serializers import CustomUserSerializer, CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    """Выдача JWT-токена с доп. информацией"""
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(CreateAPIView):
    """Регистрация нового пользователя"""
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

class UserDetailView(RetrieveAPIView):
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user  # Возвращаем текущего пользователя