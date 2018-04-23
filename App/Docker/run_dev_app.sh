#!/bin/sh

source=$HOME/Projets/VizTaPoubelle/App/src

docker rm devapp
docker run --network=host --mount type=bind,source=$source,target=/app/src --name devapp viztpapp 

