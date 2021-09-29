# Como usar el template

## Creación del repositorio usando el template

Lo primero que haremos será crear el repositorio en BinPar usando el template, esto se puede hacer
de dos formas:
  - Desde el repositorio del template (https://github.com/BinPar/bpt-next) pulsar en el botón "Use this template"
  - Desde la opción de crear nuevo repositorio donde pone "Repository template" seleccionar "BinPar/bpt-next"

**Importante:** Crear el repositorio poniendo el Owner a "BinPar" y **siempre checkeamos la opción de "Include all branches"**

## Proteger la rama main

Nos vamos a "Settings" y ahí a "Branches".

Ahí veremos "Branch protection rules" y al lado un botón de "Add rule".

En el interfaz que nos aparece dentro de "Branch name pattern" pondremos `main` y en
"Protect matching branches" marcaremos "Require a pull request before merging" y dentro de esa
marcaremos, además de la que viene por defecto, "Dismiss stale pull request approvals when new commits are pushed".

Por último marcamos "Include administrators".

Y pulsamos en "Create".

## Configurar el proyecto

Una vez hecho todo lo anterior lo único que nos falta es configurar los valores del proyecto. Para hacer esto en la ruta `k8s/templates/` hay un YAML que se llama `values.yml` que **es el único que vamos a modificar**. Dentro de la misma ruta tenemos el archivo `values-schema.yml` que contiene todos los campos configurables y los valores por defecto de los campos. No todos tienen valores por defecto y para sobreescribirlos lo haremos en el `values.yml`.

### values.yml
En el archivo `docs/examples/template-values.yml` tenéis un ejemplo de una configuración más avanzada que sobreescribe los ingress y añade config maps adicionales.

A continuación vemos lo que es cada configuración:

 - projectName: **Required** String - Indica el nombre del proyecto y se usa en los templates de k8s
 - namespace: String - El namespace de k8s en el que se despliegan los recursos (siempre se añade `-<environment>` al final automáticamente). Si se omite el namespace se infiere con el siguiente pattern `<projectName>-<environment>`.
 - defaultRootDomain: String - Por defecto `binpar.cloud`. Es el dominio sobre el que se construyen los subdominios para los distintos entornos.
 - productionDomain: String - El dominio que se utilizará para el entorno de `release`. Si se omite se infiere usando el defaultRootDomain.
 - environment: **No rellenar, omitir siempre**. Los pipelines del CI / CD rellenan este parámetro
 - healthcheckPath: String - Pro defecto `/healthcheck`. Es el endpoint donde k8s va a comprobar que la web está disponible periódicamente.
 - initialDelaySeconds: Int - Por defecto `4`. Configura esta propiedad del deploy. Es el tiempo que se retrasa la primera comprobación del healthcheck.
 - failureThreshold: Int - Por defecto `2`. Número de veces que puede fallar el healthcheck antes de marcarlo como no disponible.
 - timeoutSeconds: Int - Por defecto `5`. Número de segundos antes de que la prueba del healthcheck falle.
 - periodSeconds: Int - Por defecto `60`. Número de segundos entre pruebas de healthcheck.
 - baseReplicas: Int - Por defecto `2`. Número base de replicas del deploy.
 - releaseFactorReplicas: Int - Por defecto `2`. Multiplicador del número base de réplicas que se aplica a las versiones de release. Por ejemplo, con los valores por defecto el número de réplicas en release sería de `2 * 2 = 4`.
 - baseRAMRequest: Int - Por defecto `64`. Cantidad de mebibytes (MiB) que va a reservar nuestro deploy en versiones no release.
 - releaseFactorRAMRequest: Int - Por defecto `2`. Multiplicador de la cantidad base aplicado solo a los deploys de release.
 - baseRAMLimit: Int - Por defecto `256`. Cantidad de mebibytes (MiB) que no puede sobrepasar nuestro deploy. Si sobrepasa este umbral el proceso recibe un kill y se reinicia el pod en cuestión.
 - releaseFactorRAMLimit: Int - Por defecto `2`. Multiplicador de la cantidad base aplicado solo a los deploys de release.
 - baseCPURequest: Int - Por defecto `50`. Corresponde al número de ms de CPU que reserva (1000 sería una CPU completa).
 - releaseFactorCPURequest: Int - Por defecto `1`. Multiplicador que se aplica al valor base en los deploys de release
 - baseCPULimit: Int - Por defecto `500`. Corresponde al número de ms de CPU máximos que puede usar un pod del deploy (1000 sería una CPU completa y, en teoría, puede ser mayor).
 - releaseFactorCPULimit: Int - Por defecto `2`. Multiplicador que se aplica al valor base en los deploys de release
 - defaultConfig: YAML dict - Debe ser una serie de pares clave valor que se añadirán en el data del config map que se crea por defecto.
 - configMaps: YAML array - Aquí se puede especificar N config maps que se crearán adicionalmente. El formato de los miembros del array es un objeto que tiene una propiedad `name` que será el nombre del config map y una `data` que se corresponde con los datos que va a contener (se aplica directamente a la propiedad `data` del config map).
 - ingressAnnotations: YAML dict - Aquí se pueden especificar distintas annotations para el ingress. Estas anotaciones se añaden a las que hay por defecto a no ser que especifiquen la misma clave en cuyo caso se sobreescriben.
 - ingressRules: YAML array - Aquí se puede especificar N reglas de ingress que sustituyen a las de por defecto. Adicionalmente si queremos utilizar el nombre del servicio que se crea automáticamente en el serviceName podemos ponerle el valor `"##DEFAULT_SERVICE_NAME"` (las comillas son necesarias para que lo tome como string).
 - ingressHosts: String array - Indicar aquí los hosts de los que se tiene que crear certificado SSL. Se meten en la propiedad `tls` del ingress.

## BinFlow way (link a docu BinFlow extendida)
La forma de proceder con este nuevo template y este nuevo sistema en general es seguir la filosofía del CI / CD de una forma fiel que no nos suponga un overhead en nuestro día a día. Pongo aquí unos highlights podéis verlo en profundidad en el link.

 - **Ya no usamos gitflow**.
 - Trabajaremos en la rama develop.
 - Sólo hacer ramas de features si planteamos un cambio que puede terminar desechando todos los cambios, es decir, borrar la rama sin mergear.
 - Comitearemos a develop por lo menos una vez al día.
 - Todo lo que acaba en develop debe ser funcional y no contener errores.
 - Cuando queramos iniciar una subida a `test` tendremos que crear una pull request de develop a main que pasará los varios checks.
 - Si alguno de los checks da error se convierte en la prioridad número 1 arreglarlo y que todos los checks pasen correctamente.
 - Por último, cuando todo esté ok, mergeamos la pull request (cuidado de no eliminar develop al pulsar en la opción que da GitHub).
 - Es recomendable hacer, como mínimo, una subida al día a `test` para comprobar que todo se integra correctamente.
 - Si queremos pasar una versión a `pre-release` o a `release` seleccionamos el tag que queremos y lo convertimos en `pre-release` o `release`.

Eso sería, muy por encima, todo.

## Mantener actualizado el template

Una parte importante de esto es poder mantener el template actualizado, para esto el template incorpora en el package.json un par de scripts de npm `setupUpdateFromTemplate` y `updateFromTemplate`.
 - `setupUpdateFromTemplate`: establece un nuevo remote de git con el nombre de "template" que apunta al repositorio del template. **Este comando solo hay que ejecutarlo una vez**.
 - `updateFromTemplate`: este comando se traerá los cambios del template original que pueden tener conflictos en algún archivo que hayamos modificado y que tendremos que resolver a mano para asegurarnos de que elegir lo correcto.