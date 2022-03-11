#!/bin/bash

environments=$1
cd ./k8s/templates
./compile-templates.sh "$environments"
for environment in $environments
do
  kubectl apply -f ../compiled/$environment.yml
done
