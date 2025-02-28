from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    def create_user(
        self,
        email,
        nickname,
        date_of_birth,
        password = None,
        **extra_fields
    ):
        if not email:
            raise ValueError(_('Email обязателен'))
        user = self.model(
            email=email,
            nickname = nickname,
            date_of_birth= date_of_birth,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(
        self,
        email,
        nickname,
        date_of_birth,
        password=None,
        **extra_fields
    ):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(
            email,nickname, date_of_birth, password, **extra_fields
        )
        
        
class CustomUser(AbstractBaseUser, PermissionsMixin):
    """Кастомная модель пользователя"""

    email = models.EmailField(_('Email'), unique=True)
    nickname = models.CharField(_('Ник'), max_length=50, null=True, blank=True)
    date_of_birth = models.DateField(_('Дата рождения'), null=True, blank=True)
    is_verified = models.BooleanField(_('Подтверждён'), default=False)
    is_active = models.BooleanField(_('Активный'), default=True)
    is_staff = models.BooleanField(_('Сотрудник'), default=False)
    is_superuser = models.BooleanField(_('Суперпользователь'), default=False)
    datetime_joined = models.DateTimeField(_('Дата регистрации'), auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname', 'date_of_birth']

    class Meta:
        verbose_name = _('Пользователь')
        verbose_name_plural = _('Пользователи')

    def __str__(self):
        return self.email
