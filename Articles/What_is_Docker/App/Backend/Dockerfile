FROM python:3

WORKDIR /app 

COPY ./What_is_Docker/requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY ./What_is_Docker/ /app/

RUN python manage.py migrate

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]