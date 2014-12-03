FROM    centos:centos6

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm

# Bundle app source
COPY ./ /service
# Install app dependencies
RUN npm install inherits@2.0.0 -g --no-color
RUN npm install coffee-script -g --no-color
RUN npm install supervisor -g --no-color

EXPOSE  8080
WORKDIR /service
CMD ["supervisor", "server/app.js"]

# CMD bash
