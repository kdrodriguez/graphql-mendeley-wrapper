if(process.env.NODE_ENV === "production"){ // Verificar entorno Producción o desarrollo
}else{
  var env = require('node-env-file'); // .env file
  env(__dirname+"/.env");
}

//-------------------------------------------------------------------------------------
// 1. Información de base de datos para registros de API
//-------------------------------------------------------------------------------------
const pgPromise = require('pg-promise');
const pgp = pgPromise({}); // Empty object means no additional config required
const config = {
    /*host: 'localhost', //process.env.POSTGRES_HOST,
    port: '5432', //process.env.POSTGRES_PORT,
    database: 'your_db_name', //process.env.POSTGRES_DATABASE,
    user: 'postgres', //process.env.POSTGRES_USER,
    password: 'your_pass' //process.env.POSTGRES_PASSWORD */

    /*host: process.env.DB_HOST,
    port: '5432', //process.env.POSTGRES_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,*/

   connectionString: process.env.DATABASE_URL,
   ssl: true,
};

const db = pgp(config);
exports.db = db;

//-------------------------------------------------------------------------------------
// 2. Recuperación de información de base de datos para estadísticas
//-------------------------------------------------------------------------------------
const { Pool } = require('pg')
const pool = new Pool(config)
exports.pool = pool;
