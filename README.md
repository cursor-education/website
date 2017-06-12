# CURSOR Education Website (v3)

# Setup instructions

## Development

## Production

```
$ mkdir /home/app
$ cd /home/app

$ touch docker-compose.yml

website:
  image: cursoreducation2/website:latest
  restart: always
  hostname: landing
  ports:
    - "8081:8080"

website:
  image: cursoreducation2/website:latest
  restart: always
  hostname: landing


```


$ curl -fsSL https://get.docker.com/ | sh
$ service docker restart

$ curl -sSL https://raw.githubusercontent.com/CenturyLinkLabs/zodiac/master/install.sh | bash

docker pull cursoreducation2/website
docker run -p 80:8080 -d cursoreducation2/website

docker-compose pull
docker-compose stop
docker-compose up -d
docker exec -ti app_app_1 bash



yum install epel-release
yum install -y python-pip
pip install docker-compose

netstat -ntlp | grep 80
docker-compose run 
docker-compose run website --service-ports


* * * * * cd /home/app/ && /usr/bin/node auto-redeploy.js








docker-machine create default
docker-machine create --driver virtualbox default

docker-machine start
eval $(docker-machine env)
docker-machine ip

$ docker ps -a
$ docker rm -f {container-id} to remove specific container
$ docker rm -f $(docker ps -aq) to clean all containers
$ docker images to check images
$ docker rmi -f {image-id} to remove specific image


docker build --rm -t cursor-education/website:dev -f Dockerfile .
docker images


docker ps
docker rm cursor-website -f || true
docker run --name cursor-website -d -p 8080:8080 -v $PWD/app:/app --env-file=.env cursor-education/website:dev

docker run --name cursor-website -d -p 8080:8080 --env-file=.env cursor-education/website:dev


docker run -p 8080:8080 --env-file=.env -d cursor-education/website:dev

docker logs cursor-website -f

# Enter the container
$ docker exec -it <container id> /bin/bash

==

