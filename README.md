# GraphQL Mendeley Wrapper (API)

## Introducción

El Wrapper GraphQL de Mendeley, es un proyecto académico - investigativo el cual tiene como objetivo estudiar la tecnología GraphQL por medio del envolvimiento del API Rest de Mendeley.

## URLs Aplicación

Tanto el servidor como la aplicación de información del wrapper están alojados en Heroku; el despliegue se lo hace por medio de la conexión con este repositorio.

La página de información del wrapper:
https://graphql-mendeley.herokuapp.com/

Las estadísticas de uso del wrapper:
https://graphql-mendeley.herokuapp.com/activity

El servidor GraphQL:
https://graphql-mendeley.herokuapp.com/mendeley-graphql:

GraphQL Playground para realizar pruebas a la API:
https://graphql-mendeley.herokuapp.com/playground

## Probar API

Para poder usar la API de Mendeley por medio de Playground GraphQL, debe poseer una cuenta Mendeley, si no la tiene puede registrarse [aquí][].

- `Ingreso al portal` - Ingrese al portal de la [API GraphQL Mendeley][] y de click en **PROBAR API**.
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
## Consumir API (Cliente GraphQL)
Existen diversos clientes para GraphQL, sin embargo uno de los que mas destaca es [Apollo Client][] pero no el único, otro de estos es [Relay][]. Puede ver en este [Post][] otros diferente clientes y una explicación y ejemplo de cada uno de estos.

### Prueba de concepto
Existe una implementación de prueba la cual consume esta API; esta implementación esta desarrollada con la libreria de interaces de usuario [React.js][], la biblioteca de administración de estado para aplicaciones Javascript [Apollo Client][] y otras tecnologías del lado del cliente. Al tratarse de una prueba de concepto, ciertas funcionalidades del lado de cliente estan limitadas, pero con esta aplicación se demuestra que la API GraphQL de Mendeley es utilizable. Ir a la [demo prueba de concepto][]

[aquí]:https://www.mendeley.com/newsfeed
[API GraphQL Mendeley]: https://graphql-mendeley.herokuapp.com/
[demo prueba de concepto]: https://test-concept-gmw.herokuapp.com/
[React.js]: https://es.reactjs.org/
[Apollo Client]: https://www.apollographql.com/docs/react/
[Relay]: https://relay.dev/
[Post]: https://medium.com/open-graphql/exploring-different-graphql-clients-d1bc69de305f