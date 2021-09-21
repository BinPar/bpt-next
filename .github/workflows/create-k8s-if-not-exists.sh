#!/bin/bash

environments=$1
../../k8s/templates/compile-templates.sh $environments
for environment in $environments
do
  rancher kubectl apply -f ../../k8s/compiled/$environment.yml
done
