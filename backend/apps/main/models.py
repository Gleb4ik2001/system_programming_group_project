from django.db import models
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator
)
from auths.models import CustomUser
from django.db.models import Avg
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver


# TODO 
# добавить факултеты
# награды универа
# logo
# алрес почты инста, сайт, и т.д.
# колво грантов на факультет
# 
class City(models.Model):
    title = models.CharField(
        verbose_name='название города',
        max_length=100
    )
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'город'
        verbose_name_plural = 'города'
        ordering = ('-id',)


class Comment(models.Model):
    author = models.ForeignKey(
        verbose_name='автор комментария',
        to=CustomUser,
        related_name='comments',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    text = models.TextField(
        verbose_name='текст комментария'
    )
    datetime_created = models.DateTimeField(
        verbose_name='дата и время создания комментария',
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        verbose_name='дата и время обновления',
        auto_now=True
    )
    university = models.ForeignKey(
        verbose_name='университет',
        to="University",
        related_name='comment',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    rating = models.DecimalField(
        verbose_name='рейтинг',
        validators=[
            MinValueValidator(
                limit_value=0,
                message='рейтинг не может быть отрицательным'
            ),
            MaxValueValidator(
                limit_value=5,
                message='рейтинг не может быть больше 5'
            )
        ],
        max_digits=3,
        decimal_places=2
    )
    
    def __str__(self):
        return f"{self.author} | {self.text}"
    
    class Meta:
        verbose_name = "комментарий"
        verbose_name_plural = "комментарии"
        ordering = ("-id",)


class University(models.Model):
    title = models.CharField(
        verbose_name='название университета',
        max_length=255,
        unique=True,
        null=False,
        blank=False
    )
    city= models.ForeignKey(
        verbose_name='город',
        to=City,
        related_name='university',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    address = models.CharField(
        verbose_name='адрес университета',
        max_length=200,
        null=False,
        blank=False,
        help_text='Формат: страна,город,улица,номер улицы'
    )
    rating = models.DecimalField(
        verbose_name='рейтинг',
        validators=[
            MinValueValidator(
                limit_value=0,
                message='рейтинг не может быть отрицательным'
            ),
            MaxValueValidator(
                limit_value=5,
                message='рейтинг не может быть больше 5'
            )
        ],
        max_digits=3,
        decimal_places=2
    )
    logo = models.URLField(verbose_name="Логотип", max_length=500, null=True, blank=True)
    website = models.URLField(verbose_name="Сайт", max_length=500, null=True, blank=True)

    def update_rating(self):
        """Обновляет рейтинг университета на основе среднего рейтинга комментариев."""
        avg_rating = self.comment.aggregate(avg_rating=Avg('rating'))['avg_rating']
        self.rating = round(avg_rating, 2) if avg_rating is not None else 0
        self.save(update_fields=['rating'])

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'университет'
        verbose_name_plural = 'университеты'
        ordering = ('-id',)

@receiver(post_save, sender=Comment)
@receiver(post_delete, sender=Comment)
def update_university_rating(sender, instance, **kwargs):
    """Обновляет рейтинг университета при изменении комментариев."""
    if instance.university:
        instance.university.update_rating()
