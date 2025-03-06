from django.http import JsonResponse
import json
from .models import *
from .serialzers import *
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def University_list(request):
    origin = University.objects.all()
    output = University_serial(origin, many=True).data
    return JsonResponse(output, safe=False)

def University_comments(request , university_id):
    origin = Comment.objects.filter(university=university_id)
    output = Comment_serial(origin, many=True).data
    return JsonResponse(output, safe=False)
