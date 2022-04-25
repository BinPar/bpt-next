load("@ytt:data", "data")
load("@ytt:struct", "struct")
load("@ytt:assert", "assert")

if not data.values.projectName.islower():
  assert.fail("projectName should be a non-empty lowercased string")
end
if not (data.values.environment == "test" or data.values.environment == "pre-release" or data.values.environment == "release"):
  assert.fail("environment should be 'test', 'pre-release' or 'release'")
end

def namespaceName():
  if data.values.namespace:
    return data.values.namespace+"-"+data.values.environment
  else:
    return data.values.projectName+"-"+data.values.environment
  end
end

def projectName():
  return data.values.projectName
end

def deployName():
  return "deploy-"+data.values.projectName
end

def serviceName():
  return "service-"+data.values.projectName
end

def appName():
  return data.values.projectName+"-runner"
end

def monitorName():
  return data.values.projectName+"-servicemonitor"
end

def ingressName():
  return "ingress-"+data.values.projectName+"-"+data.values.environment
end

def imageName():
  return "402083338966.dkr.ecr.eu-west-1.amazonaws.com/"+data.values.projectName+":"+data.values.environment
end

def certificateName():
  return "cert-"+data.values.projectName
end

def defaultConfigMapName():
  return "default-conf-"+data.values.projectName
end

def isRelease():
  return data.values.environment == "release"
end

def isTest():
  return data.values.environment == "test"
end

def defaultLabels(instance):
  return {'app.kubernetes.io/name': data.values.projectName, 'app.kubernetes.io/instance': instance, 'app.kubernetes.io/environment': data.values.environment }
end

def defaultHostname():
  if isRelease():
    if data.values.productionDomain:
      return data.values.productionDomain
    else:
      return data.values.projectName+"." + data.values.defaultRootDomain
    end
  else:
    if isTest():
      if data.values.testDomain:
        return data.values.testDomain
      else:
        return data.values.projectName+"-"+data.values.environment+"." + data.values.defaultRootDomain
      end
    else:
      return data.values.projectName+"-"+data.values.environment+"." + data.values.defaultRootDomain
    end
  end
end

def replaceDefaultServiceNameInRules(rules):
  rulesDict = struct.decode(rules)
  for rule in rulesDict:
    if rule.get('http') and rule["http"].get('paths'):
      for path in rule["http"]["paths"]:
        if path.get('backend') and path["backend"].get('serviceName') and path["backend"]["serviceName"].find("##DEFAULT_SERVICE_NAME") > -1:
          path["backend"]["serviceName"] = serviceName()
        end
      end
    end
  end
  return rulesDict
end

def recursiveLookupForStringAndReplace(obj, lookupString, newValue):
  if (type(obj) == "string"):
    return obj.replace(lookupString, newValue)
  end
  if (type(obj) == "struct"):
    obj = struct.decode(obj)
  end
  if type(obj) == "list":
    return [recursiveLookupForStringAndReplace(item, lookupString, newValue) for item in obj]
  end
  if type(obj) == "dict":
    return { key: recursiveLookupForStringAndReplace(value, lookupString, newValue) for key, value in obj.items() }
  end
  return obj
end

utils = struct.make(recursiveLookupForStringAndReplace=recursiveLookupForStringAndReplace, replaceDefaultServiceNameInRules=replaceDefaultServiceNameInRules, certificateName=certificateName, defaultConfigMapName=defaultConfigMapName, imageName=imageName, isRelease=isRelease, deployName=deployName, serviceName=serviceName, ingressName=ingressName, defaultLabels=defaultLabels, defaultHostname=defaultHostname, namespaceName=namespaceName, appName=appName, monitorName=monitorName, projectName=projectName)