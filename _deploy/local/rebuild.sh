#!/bin/bash

list=("$@")

for var in "${list[@]}"; do
    docker stop $var
    docker rm -f $var
    docker rmi -f local-$var
    docker volume prune -f
    docker-compose up --build -d $var
done