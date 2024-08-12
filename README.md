# Prueba Frontend Junior


#### Estructura del Proyecto
El proyecto se organiza en torno a tres entidades principales, cada una accesible a través de una interfaz de usuario que permite visualizar su información al hacer clic en un ítem correspondiente:

Presidentes (President)
Aeropuertos (Airport)
Atracciones Turísticas (TouristicAttraction)

#### Entidad President
La sección correspondiente a la entidad President muestra el número total de registros de presidentes almacenados en el sistema. Para garantizar la integridad de los datos, se realiza un conteo de presidentes agrupados por partido político, comparando este conteo con el número total de registros recibidos desde la API. Esta validación asegura que no se han perdido datos durante el proceso de obtención.

La lógica que implementa esta validación se ejemplifica en el siguiente fragmento de código:

{partyStats.reduce((acc, curr) => acc + curr.count, 0) === presidents ? presidents : 'Faltan registros'}

Si el número de presidentes agrupados por partido coincide con el total de registros recibidos desde la API, los datos se consideran consistentes. En caso contrario, se notifica la falta de registros.

Además, se muestra el tiempo de respuesta de la solicitud a la API, lo que proporciona una métrica clave de rendimiento para la aplicación. Debajo de esta información, se despliega una tabla que detalla la cantidad de presidentes por partido político, facilitando un análisis más detallado de su distribución.

#### Entidad Airport

La entidad Airport se organiza en tres componentes clave:

##### Componente 1: Agrupamiento por Departamento y Ciudad

Este componente muestra una tabla que agrupa los aeropuertos por departamento y ciudad, con un conteo de los aeropuertos en cada grupo. Se compara el conteo total de aeropuertos agrupados con el número de registros obtenidos desde la API para validar la integridad de los datos.

La lógica de validación se implementa como sigue:
 {airportStats.reduce((acc, curr) => acc + curr.count, 0) ===
        airportCount
          ? airportCount
          : "Faltan registros"}

Si los números coinciden, los datos se consideran consistentes; de lo contrario, se notifica la falta de registros. También se muestra el tiempo de respuesta de la API, y se presenta una tabla con la cantidad de aeropuertos por departamento y ciudad, permitiendo un análisis detallado de su distribución.

##### Componente 2: Agrupamiento por Región, Departamento, Ciudad y Tipo

Este componente realiza un agrupamiento adicional de los aeropuertos, añadiendo la dimensión "Tipo". Se valida de manera similar a la anterior, comparando el conteo de aeropuertos por grupo con el total de registros de la API:

 {airportStats.reduce((acc, curr) => acc + curr.count, 0) ===
        airportCount
          ? airportCount
          : "Faltan registros"}

Si los datos son consistentes, se procede a mostrar el tiempo de respuesta de la API y una tabla detallada que ilustra la distribución de los aeropuertos según región, departamento, ciudad y tipo.

##### Componente 3: Estructura de Datos de Salida

Este componente genera una estructura de datos de salida con un formato predeterminado, adecuada para exportaciones o integraciones.


#### entidad touristattracion

En la entidad TouristicAttraction, se agrupan las atracciones turísticas por departamento y ciudad, con un conteo correspondiente. Al igual que en las otras entidades, este conteo se compara con los datos recibidos desde la API para asegurar que no se hayan perdido registros:
         {touristStats.reduce((acc, curr) => acc + curr.count, 0) == tourist
            ? tourist
            : "faltan registros"}

Si los registros coinciden, se confirma la consistencia de los datos. Además, se presenta el tiempo de respuesta de la API y una tabla que detalla la cantidad de atracciones turísticas por departamento y ciudad, lo que facilita un análisis exhaustivo de su distribución.

#### Tecnologías Utilizadas

En este proyecto se emplearon las siguientes tecnologías:

###### JavaScript: Utilizado junto con el framework React para el desarrollo de la interfaz de usuario.
###### CSS: Se utilizó CSS puro para el estilo y diseño, sin el uso de frameworks o librerías CSS adicionales.
###### Docker: La aplicación fue dockerizada para facilitar su despliegue y portabilidad. Se creó un archivo Dockerfile para construir la imagen de la aplicación y un archivo docker-compose.yml para gestionar los servicios de manera sencilla. El uso de Docker en este proyecto permite asegurar la consistencia del entorno de ejecución, facilitando tanto el despliegue en diferentes plataformas como la colaboración entre desarrolladores.

#### Estructura de Carpetas

La estructura del proyecto se organiza en las siguientes carpetas clave:

###### api/: Contiene todas las llamadas a la API, centralizadas en el archivo Calls.js.
###### screens/: Contiene los componentes de React correspondientes a cada entidad del proyecto, con sus respectivos archivos .jsx.
###### styles/: Contiene los archivos de estilo CSS aplicados a cada entidad, con extensión .css.
###### Dockerfile: Archivo utilizado para la creación de la imagen Docker de la aplicación.
###### docker-compose.yml: Archivo de configuración utilizado para desplegar la aplicación mediante Docker Compose.
###### main.jsx: Archivo que maneja el enrutamiento de la aplicación. La aplicación se sirve en la ruta /colombia_dash, y cualquier acceso a la raíz redirige automáticamente a esta ruta para evitar confusiones. Si se intenta acceder a cualquier otra ruta no definida, se mostrará un mensaje de error.

#### Despliegue e Inicialización

Existen varias formas de desplegar e inicializar esta aplicación:

##### Clonación y Ejecución Local:

###### Clonar el repositorio desde GitHub: https://github.com/juanesGarcia/colombian_api_juan_cubillos_garcia.
###### Instalar las dependencias ejecutando npm install.
###### Iniciar la aplicación en modo de desarrollo con el comando npm run dev.

##### Despliegue con Docker:

###### Crear la imagen Docker con el comando docker build -t nombre_imagen ..
###### Ejecutar el contenedor con docker run -p 3000:3000 nombre_imagen.
###### Alternativamente, para un despliegue más sencillo, se puede utilizar Docker Compose:
###### Iniciar la aplicación con docker-compose up, que levantará todos los servicios definidos en el archivo docker-compose.yml.

##### Despliegue en la Nube:

###### La aplicación también ha sido desplegada en Vercel y está disponible en la siguiente URL: https://frontend-jr.vercel.app/.
