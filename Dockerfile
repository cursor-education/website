FROM centos:7

RUN yum -v

# ADD app/ /app/
# RUN chown -R webapp:webapp /app

# COPY package.json /src/package.json
# RUN cd /src; npm install

# COPY . /src

# USER webapp

EXPOSE 8080
CMD ["node", "/src/index.js"]
# ENTRYPOINT ["/app/env/bin/uwsgi", "--ini", "/app/uwsgi.ini"]