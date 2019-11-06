# GraphQL Mendeley Wrapper (API)

## Introducción

El Wrapper GraphQL de Mendeley, es un proyecto académico - investigativo el cual tiene como objetivo estudiar la tecnología GraphQL por medio del envolvimiento del API Rest de Mendeley.

## URLs Aplicación

Tanto el servidor como la aplicación de información del wrapper están alojados en Heroku; el despliegue se lo hace por medio de la conección con este repositorio.

La página de información del wrapper:
https://graphql-mendeley.herokuapp.com/:

Las estadísticas de uso del wrapper:
https://graphql-mendeley.herokuapp.com/activity

El servidor GraphQL:
https://graphql-mendeley.herokuapp.com/mendeley-graphql:

GraphQL Playground para realizar pruebas a la API:
https://graphql-mendeley.herokuapp.com/playground:

## Probar API

Para poder usar la API de Mendeley por medio de Playground GraphQL, debe poseer una cuenta Mendeley, si no la tiene puede registrarse [aquí][]:

- `Ingreso al portal` - Ingrese al portal de la [API GraphQL Mendeley][]: y de click en **PROBAR API**.
- `Proporcionar credenciales` - Deberá proporcionar sus credenciales de Mendeley o a su vez confirmar su identidad Mendeley.
- `Proporcionar permisos a la API GraphQL` -  Despúes de proporcionar las credenciales, deberá de dar permisos de uso a la API para poder usar el token generado para poder realizar peticiones (Esto guardará una cookie con el token generado).
- `Ir a GraphQL Playground` - Después de proporcionar los permiso de uso de token, podrá dirigirse a Playground a realizar peticiones. Nota: Si no dio permisos de uso del token, las peticiones a la API generaran un mensaje informando que el token es inválido.
- `Consulta básica` - Una consulta básica para probar la funcionalidad de la API.

```graphql
query {
  documents {
    id
    title
    authors{
      first_name
      last_name
    }
    .
    .
    .
  }
}
```

## Prueba de concepto

En desarrollo

[aquí]:https://www.mendeley.com/newsfeed
[API GraphQL Mendeley]: https://graphql-mendeley.herokuapp.com/
