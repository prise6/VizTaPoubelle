#!/bin/sh

source=$HOME/Projets/VizTaPoubelle/App/src


docker rm prodapp
docker run --network=host --mount type=bind,source=$source,target=/app/src --name prodapp viztpapp
docker cp prodapp:/app/dist $source/../
cp $source/index.html $source/../dist/
mkdir -p $source/../dist/assets/json
cp $source/assets/json/* $source/../dist/assets/json/
cp $source/assets/img/*.png $source/../dist/assets/img/
