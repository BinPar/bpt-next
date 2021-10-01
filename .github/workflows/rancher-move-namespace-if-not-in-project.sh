#!/bin/bash

namespace=$1
projectId=$2
res=$(rancher namespaces ls | awk '{print $2}' | grep "^${namespace}$")
if [ -z "$res" ]; then
    rancher namespaces move $namespace $projectId
fi
