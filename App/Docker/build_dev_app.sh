#!/bin/sh

app=~/Projets/VizTaPoubelle/App
net="host"

docker build --build-arg app_env=dev --network=$net -t viztpapp:latest $app
