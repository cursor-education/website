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

docker run -p 49160:8080 -d cursor-education/website:dev --env-file=.env

docker ps

$ docker logs <container id>

# Enter the container
$ docker exec -it <container id> /bin/bash