from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import xml.etree.ElementTree as ET

from events.models import Event, Session

# Create your views here.
@require_http_methods(['GET'])
def index(request):
    root = ET.Element('events')

    for event in Event.objects.all():
        xml_event = ET.SubElement(root, 'event')
        ET.SubElement(xml_event, 'id').text = str(event.id)
        ET.SubElement(xml_event, 'date').text = str(event.date)
        ET.SubElement(xml_event, 'city').text = event.city
        ET.SubElement(xml_event, 'state').text = event.state
        ET.SubElement(xml_event, 'country').text = event.country
        ET.SubElement(xml_event, 'capacity').text = str(event.capacity)
        ET.SubElement(xml_event, 'map_url').text = event.map_url

    xml_str = ET.tostring(root, encoding='utf8', method='xml')
    return HttpResponse(xml_str, content_type='application/xml')

@require_http_methods(['GET'])
def schedule(request):
    id_param = request.GET.get('id')
    sessions = Session.objects.filter(event_id=id_param)

    sessions_data = []
    for session in sessions:
        sessions_data.append({
            "id": session.id,
            "event_id": session.event_id,
            "title": session.title,
            "description": session.description,
            "start_time": session.start_time,
        })

    return JsonResponse({"sessions": sessions_data})

@require_http_methods(['GET'])
def session(request):
    id_param = request.GET.get('id')
    session_data = Session.objects.get(id=id_param)
    html = "<h3>" + session_data.title + "</h3>" + "<p>" + session_data.description + "</p>"
    return HttpResponse(html, content_type='text/html')

