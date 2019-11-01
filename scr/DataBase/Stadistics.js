const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'grql_mendeley_bitacora',
  password: 'admin12345',
  port: 5432,
})

// -- Consultas personalizadas para obtener la estadisticas de la API.
  const queryOperation = 'SELECT public.user.display_name_user, operation_action.type_resource,'+ 
  'operation_action.type_operation, operation_action.graphql_operation FROM operation_action'+ 
  'JOIN public.user ON (operation_action.id_user = public.user.id_user) ORDER BY type_resource';
  const queryOperationMonths = "select case EXTRACT(MONTH FROM operation_date) "+ 
  "when 1 then 'ene' when 2 then 'feb' when 3 then 'mar' when 4 then 'abr' "+
  "when 5 then 'may' when 6 then 'jun' when 7 then 'jul' when 8 then 'ago' "+
  "when 9 then 'sep' when 10 then 'oct' when 11 then 'nov' when 12 then 'dic' end as mes, "+
  "COUNT(EXTRACT(MONTH FROM operation_date)) "+
  "from public.operation_action "+
  "WHERE EXTRACT(YEAR FROM operation_date)= EXTRACT(YEAR FROM current_date) "+
  "GROUP BY EXTRACT(MONTH FROM operation_date)"

// -- Acceso a la BDD para obtener los registros.
  pool.query(queryOperation, (err, res) => {
    if(err){
      return console.error("Error de BDD: ", err);
    }

    pool.query('SELECT * FROM public.user', (err2, res2) => {
      if(err2){
        return console.error("Error de BDD: ", err2);
      }

      pool.query(queryOperationMonths, (err3, res3) => {
        if(err3){
          return console.error("Error de BDD: ", err3);
        }

        var gqlQueries=0;
        var gqlMutations=0;

        var restGet=0;
        var restPost=0;
        var restPatch=0;
        var restDelete=0;

        var rec_doc=0;
        var rec_doc_fol=0;
        var rec_doc_typ=0;
        var rec_doc_ide=0;
        var rec_fol=0;
        var rec_fol_add_doc=0;
        var rec_fol_rem_doc=0;
        var rec_fil=0;
        var rec_gro=0;
        var rec_pro=0;
  
        res.rows.forEach(function(element) {
          element.graphql_operation === 'Q' ? gqlQueries++ : gqlMutations++ ;

          element.type_operation === 'GET' ? restGet++ : 
          element.type_operation === 'POST' ? restPost++ : 
          element.type_operation === 'PATCH' ? restPatch++ : 
          restDelete++ ; 

          element.type_resource === 'document' ? rec_doc++ : 
          element.type_resource === 'documents-folder' ? rec_doc_fol++ : 
          element.type_resource === 'document-types' ? rec_doc_typ++ :
          element.type_resource === 'document-identifiers' ? rec_doc_ide++ : 
          element.type_resource === 'folder' ? rec_fol++ : 
          element.type_resource === 'add-folder-docs' ? rec_fol_add_doc++ : 
          element.type_resource === 'rem-folder-docs' ? rec_fol_rem_doc++ : 
          element.type_resource === 'file' ? rec_fil++ : 
          element.type_resource === 'group' ? rec_gro++ :  
          rec_pro++ ; 
        });
  
        response.render('activity.html', {
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