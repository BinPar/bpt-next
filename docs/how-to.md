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