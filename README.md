samples in this project come from
udemy course: https://www.udemy.com/course/docker-mastery
and https://github.com/sindresorhus/awesome
and https://docs.docker.com/get-started/

-------------------------------------
- stop all contaiers
docker stop $(docker ps -aq)

- remove all containers
docker rm $(docker ps -aq)

- remove image boilerplate/api:lts
docker rmi boilerplate/api:lts

- remove all images
docker rmi $(docker images -q)

- remove all volumes
docker volume rm $(docker volume ls -q)

- docker up met build
docker compose up -d --build

- pull the hello-world image
docker pull hello-world

- list images
docker images

- run the hello-world app in its container
docker run hello-world

- list docker containers
docker container ls -a

- remove hello-world container
docker rm <name of the hello-world container>

- inspect a hello-world container detail naar ../inspect.log
docker inspect hello-world-container-name > ../inspect.log

- push an image to the registry
docker push

- pull an image from the registry
docker pull

-------------------------------------

- service detail
docker exec -u root  boilerplate-api-php-1 ls -l

- list all container with memmory ussage more than 20%
docker stats $(docker ps|grep -v "NAMES"|awk '{ print $NF }'|tr "\n" " ") --no-stream | sort -k 8n | awk '(NR>1) && ($8 > 20 ) '

- override previous php-enivironment
<<: *php-environment

-------------------------------------
- docker filter voorbeeld, met output als "healthy"
docker inspect --format "{{json .State.Health.Status }}" boilerplate-mysql-1

-------------------------------------
- proxy server, ipv container, https verbinding met de browser
- shared-proxy network, stuurt door naar de juiste proxy container


- https://gitlab.com/mybit/development-teams/team-x

- https://hub.docker.com/r/axllent/mailpit --> volumes nodig?

- https://hub.docker.com/_/mysql --> wordt beschreven volumes nodig is

  docker documentatie
- https://docs.docker.com/compose/compose-file/
  - Short syntax: ro readonly

-------------
docker login op gitlab https://docs.gitlab.com/ee/user/packages/container_registry/authenticate_with_container_registry.html

stel de PULL_TOKEN is gemaakt in gitlab, voer de volgende commando uit:
 TOKEN=<token>
 READ_TOKEN=<token>
 echo "$READ_TOKEN" | docker login registry.gitlab.com -u bchu7 --password-stdin
 of
 docker login registry.gitlab.com -u bchu7 --password-stdin <<<$TOKEN
 
-----------------------------------
docker compose up krijgt volgende error:
failed to solve: Internal: Internal: Internal: stream terminated by RST_STREAM with error code: INTERNAL_ERROR

oplossing: Dockerfile stel de encoding in UTF-8

--------------------
docker compose up
docker compose stop
docker compose down

--------------------
Build met Dockerfile

- composer install
- docker buildx b -t "boilerplate/api:lts" .
- docker image list

--------------------
# run watch code change... with the following Dockerfile and compose.yaml
# https://github.com/docker/awesome-compose/tree/master/apache-php
docker compose watch
of docker compose up --watch

# Dockerfile sample in watch mode:
FROM --platform=$BUILDPLATFORM php:8.0.9-apache as builder
CMD ["apache2-foreground"]

#compose.yaml sample in watch mode with develop section:
services:
  web:
    build:
      context: app
      target: builder
    ports: 
      - '80:80'
    volumes:
      - ./app:/var/www/html/
    develop:
      watch:
        - action: sync
          path: .
          target: /app

----------------------------------------
Docker build and image and push to https://hub.docker.com
- Create a project include Dockerfile and docker-compose.yml containing steps to create an image.
  Zie example d:\Zelfstudie\getting-started-todo-app
- Create a new repo 'getting-started-todo-app' in https://hub.docker.com
- Login to docker hub, where 77448855 is the username: docker login -u 77448855
- Push to docker hub: docker push 77448855/getting-started-todo-app

----------------------------------------
Understanding the image layers
https://docs.docker.com/get-started/docker-concepts/building-images/understanding-image-layers/

- run interactive ubuntu in container 'base-container'
docker run --name=base-container -ti ubuntu

- container base-container's prompt
--> root@d8c5ca119fcd:/#

- install nodejs within the container's prompt
apt update && apt install -y nodejs

- check whether nodejs is correctly installed within the container's prompt
node -e 'console.log("Hello world!")'

- create an image 'node-base' from container's changes
docker container commit -m "Add node" base-container node-base

- show 'node-base' image history
docker image history node-base

- check if the new image 'node-base' work as expected
docker container run --name=new-container node-base node -e "console.log('Hello again')"

==> create a new image from node-base
docker run --name=app-container -ti node-base

- container app-container's prompt
--> root@05cce3e15567:/#

- add a script within container's prompt
echo 'console.log("Hello from an app")' > app.js
node app.js

- create a image 'sample-app' from app-container
docker container commit -c "CMD node app.js" -m "Add app" app-container sample-app

- run sample-app image in my-container
docker run --name=my-container sample-app

-------------------------------------------------
- docker login, fill in password when prompt for password.
docker login -u 77448855

- Docker tags allow you to label and version your images, where dec34e7a06be is the source image ID
docker tag dec34e7a06be 77448855/docker-quickstart:1.0

- and push to an existing repository in docker hub
docker push 77448855/docker-quickstart
docker push 77448855/docker-quickstart:1.0

-------------------------------------------------