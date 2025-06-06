from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from forms.models import Form

# Create your views here.
@csrf_exempt
@require_http_methods(['POST'])
def index(request):
    name = request.POST.get('name')
    message = request.POST.get('message')

    new_form = Form.objects.using("forms").create(name=name, message=message)

    if new_form.id:
        return_data = { "status": 200, "message": "success", "id": new_form.id}
    else:
        return_data = {"status": 500, "message": "error", "id": "null"}

    return JsonResponse(return_data)