# https://hub.docker.com/_/httpd
FROM httpd:latest

# Default location according to docs is in /usr
COPY ./What_is_Docker/ /usr/local/apache2/htdocs/

# Config file in /usr/loca/apache2
RUN sed -i '0,/Listen 80/s/Listen 80/Listen 8081/' /usr/local/apache2/conf/httpd.conf

RUN sed -i '$a DirectoryIndex index.html' /usr/local/apache2/conf/httpd.conf

# By default Apache uses 
EXPOSE 8081

CMD ["httpd-foreground"]