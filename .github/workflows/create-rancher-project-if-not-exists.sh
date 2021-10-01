#!/bin/bash

project=$1
res=$(rancher project ls | awk '{print $2}' | grep "^${project}$")
if [ -z "$res" ]; then
    rancher project create $project
fi
