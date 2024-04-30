## Documentacion publica de la API

[Enlace directo a documentacion de Postman](https://documenter.getpostman.com/view/11141626/2sA3JDhRAj)

El proyecto cuenta con soporte directo con Docker y docker compose.

Para levantar el proyecto directamente solo es necesario el comando `docker-compose -d up`
dicho comando levantara el proyecto en un contenedor de docker y una instancia de mysql,

El esquema de base de datos se cargara de forma automatica, en caso de no hacerlo modificar
el valor de `sequelize.sync({ force: false })` a true una vez para que se cargue el esquema,
dicha linea de codigo se encuentra en el archivo database.js en la carpeta src de este proyecto.
