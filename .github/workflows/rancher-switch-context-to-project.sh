#!/bin/bash

project=$1
projectId=$(rancher project ls | grep "${project}" | awk '{print $1}')
if [ -z "$projectId" ]; then
    echo "Project '$project' not found"
    exit 1
else
    echo "Project found. Switching context to: '${projectId}'"
    rancher context switch "$projectId"
    echo "::set-output name=projectId::$projectId"
fi
