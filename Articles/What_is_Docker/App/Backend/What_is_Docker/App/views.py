import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.views.decorators.http import require_http_methods

from App.models import Person
from django.core import serializers

from datetime import datetime

@require_http_methods(["DELETE"])
def delete(request, person_id):
    try:
        person = Person.objects.get(id=person_id)
    except Person.DoesNotExist:
        return JsonResponse({"error": "Person does not exist"}, status=404)

    person.delete()
    return JsonResponse({"success": True}, status=200)

@require_http_methods(["PUT"])
def modify(request, person_id):
    try:
        person = Person.objects.get(id=person_id)
    except Person.DoesNotExist:
        return JsonResponse({"error": "Person does not exist"}, status=404)

    try:
        name = json.loads(request.body)["name"]
        # dob = json.loads(request.body)["dob"]
    except KeyError:
        return JsonResponse({"status": "key error"}, status=400)

    # dob_object = datetime.strptime(dob, '%Y-%m-%d').date()

    person = Person.objects.get(id=person_id)
    person.name = name
    # person.dob = dob_object
    person.save()
    return JsonResponse({"status": "ok"}, status=201)

@require_http_methods(['POST'])
def register(request):
    try:
        name = request.POST['name']
        dob = request.POST['dob']
    except KeyError:
        return JsonResponse({"status": "key error"}, status=400)

    dob_object = datetime.strptime(dob, '%Y-%m-%d').date()

    person = Person(name=name, dob=dob_object)
    person.save()
    return JsonResponse({"status": "ok"}, status=201)

@require_http_methods(['GET'])
def get_all(request):
    people = Person.objects.all()
    json_data = {'data': []}

    for person in people:
        json_data['data'].append({
            'id': person.id,
            'name': person.name,
            'dob': person.dob,
            'timestamp': person.timestamp,
        })

    return JsonResponse(json_data)