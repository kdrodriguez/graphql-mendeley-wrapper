/* ************
   Servidor Yoga, express y nunjucks
   **************/

const { GraphQLServer } = require('graphql-yoga')
var url = require('url');
var body_parser = require('body-parser');
var cookieParser = require('cookie-parser')
const cors = require('cors');
const nunjucks = require('nunjucks');
const resolvers = require('./Resolvers/');
// Conexión a postgres para obtener consultas de estadistica de la API
const { pool } = require("../scr/DataBase/cnn");

const server = new GraphQLServer({
  typeDefs: process.env.NODE_ENV === "production" ? 'scr/Schema/schema.graphql': './Schema/schema.graphql',
  //typeDefs:  './Schema/schema.graphql',  // DEV
  //typeDefs: 'scr/Schema/schema.graphql',  // PROD (HEROKU)
  resolvers,
  /*headers: {
    "Access-Control-Allow-Origin": "*" ,// Required for CORS support to work
    'Access-Control-Allow-Methods': 'DELETE, PUT, GET, POST',
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  },*/
  context: (req) => ({ ...req }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',  //'request.credentials': 'include'
    }
  },
   /*context: ({ response, ...rest }) => {
    //var params = url.parse(request.url,true).query;  console.log(params.token);
    return {
      response,
      access_token: "ffff"
      Hola: 'aaaaa'
    };
  },*/
})

server.use(body_parser.urlencoded({ extended: true }));

var express = require('express');
var app = server.express;
nunjucks.configure(__dirname + '/public', {
  express: app
});
//app.listen(process.env.PORT || 4001);
app.use(express.static(__dirname + '/public'))
server.express.use(cookieParser())

//server.use(cors('*'))  // not having cors enabled will cause an access control error
//server.use(cors('*')) 

  /*server.use(  // SERVER CORSSSSS ¨***************
  cors({
    credentials: true,
    origin: "http://localhost:3000"
    origin: process.env.FRONTEND_URL
  })
  )*/

server.use(express.static(__dirname + '/public'))

server.get('/index', function (req, res) { // SE LO PODRIA QUITAR YA QUE NO INTERFIERE EN EL FUNCIONAMIENTO
  res.sendFile(__dirname + '/public/index.html');
});

server.get('/confirmAuth', function (req, res) {
  res.sendFile(__dirname + '/public/confirmAuth.html');
});

app.get('/Activity', function (req, response) {
  //res.sendFile(__dirname+"/public/activity.html");
  const queryOperation = 'SELECT public.user.display_name_user, operation_action.type_resource, operation_action.type_operation, operation_action.graphql_operation FROM operation_action JOIN public.user ON (operation_action.id_user = public.user.id_user) ORDER BY type_resource';
  const queryOperationMonths = "select case EXTRACT(MONTH FROM operation_date) " +
    "when 1 then 'ene' when 2 then 'feb' when 3 then 'mar' when 4 then 'abr' " +
    "when 5 then 'may' when 6 then 'jun' when 7 then 'jul' when 8 then 'ago' " +
    "when 9 then 'sep' when 10 then 'oct' when 11 then 'nov' when 12 then 'dic' end as mes, " +
    "COUNT(EXTRACT(MONTH FROM operation_date)) " +
    "from public.operation_action " +
    "WHERE EXTRACT(YEAR FROM operation_date)= EXTRACT(YEAR FROM current_date) " +
    "GROUP BY EXTRACT(MONTH FROM operation_date)"

  pool.query(queryOperation, (err, res) => {
    if (err) {
      return console.error("Error de BDD: err", err);
    }

    pool.query('SELECT * FROM public.user', (err2, res2) => {
      if (err2) {
        return console.error("Error de BDD: err2", err2);
      }

      pool.query(queryOperationMonths, (err3, res3) => {
        if (err3) {
          return console.error("Error de BDD: err3", err3);
        }

        var gqlQueries = 0;
        var gqlMutations = 0;

        var restGet = 0;
        var restPost = 0;
        var restPatch = 0;
        var restDelete = 0;

        var rec_doc = 0;
        var rec_doc_fol = 0;
        var rec_doc_typ = 0;
        var rec_doc_ide = 0;
        var rec_fol = 0;
        var rec_fol_add_doc = 0;
        var rec_fol_rem_doc = 0;
        var rec_fil = 0;
        var rec_gro = 0;
        var rec_pro = 0;
        //console.log("DataMonths: ",res3.rows);
        res.rows.forEach(function (element) {
          element.graphql_operation === 'Q' ? gqlQueries++ : gqlMutations++;

          element.type_operation === 'GET' ? restGet++ :
            element.type_operation === 'POST' ? restPost++ :
              element.type_operation === 'PATCH' ? restPatch++ :
                restDelete++;

          element.type_resource === 'document' ? rec_doc++ :
            element.type_resource === 'documents-folder' ? rec_doc_fol++ :
              element.type_resource === 'document-types' ? rec_doc_typ++ :
                element.type_resource === 'document-identifiers' ? rec_doc_ide++ :
                  element.type_resource === 'folder' ? rec_fol++ :
                    element.type_resource === 'add-folder-docs' ? rec_fol_add_doc++ :
                      element.type_resource === 'rem-folder-docs' ? rec_fol_rem_doc++ :
                        element.type_resource === 'file' ? rec_fil++ :
                          element.type_resource === 'group' ? rec_gro++ :
                            rec_pro++;
        });

        response.render('Activity.html', {
          activityData: res.rows,
          userData: res2.rows,
          totalUsers: res2.rows.length,
          restGet,
          restPost,
          restPatch,
          restDelete,
          gqlQueries: gqlQueries,
          gqlMutations: gqlMutations,
          totalOperations: res.rows.length,
          Activitymonths: res3.rows,
          rec_doc,
          rec_doc_fol,
          rec_doc_typ,
          rec_doc_ide,
          rec_fol,
          rec_fol_add_doc,
          rec_fol_rem_doc,
          rec_fil,
          rec_gro,
          rec_pro,
        });
      });
    })
    // pool.end()
  })
});

//const FRONTEND_HOST = "localhost";
//const origin = `http://${FRONTEND_HOST}:3000`;

const options = {
  port: process.env.PORT || 4000,
  endpoint: '/mendeley-graphql',
  playground: '/playground',
  cors: {
    credentials: true,
    origin: true // your frontend url.
  }
}

server.start(options, ({ port, playground, endpoint }) => console.log(`El servidor está ejecutandose en http://localhost:${port}`))

//server.start(() => console.log(`El servidor está ejecutandose en http://localhost:4000`)) 
//************************************************************************************