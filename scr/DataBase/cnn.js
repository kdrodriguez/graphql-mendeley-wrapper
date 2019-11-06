//-------------------------------------------------------------------------------------
// 1. Información de base de datos para registros de API
//-------------------------------------------------------------------------------------
const pgPromise = require('pg-promise');
const pgp = pgPromise({}); // Empty object means no additional config required
const config = {
    /*host: 'localhost', //process.env.POSTGRES_HOST,
    port: '5432', //process.env.POSTGRES_PORT,
    database: 'grql_mendeley_bitacora', //process.env.POSTGRES_DATABASE,
    user: 'postgres', //process.env.POSTGRES_USER,
    password: 'admin12345' //process.env.POSTGRES_PASSWORD */
    host: 'ec2-174-129-253-68.compute-1.amazonaws.com',
    port: '5432', //process.env.POSTGRES_PORT,
    database: 'denju6spl4b8r3',
    user: 'roafuftzlbodfw',
    password: '4de5d39a241ccd2c452307e934530a509fb916c0745103095f24d3f1b13efe6c',
    ssl: true, // Permite acceso a la bdd remotamente (app localhost)
};

const db = pgp(config);
exports.db = db;

//-------------------------------------------------------------------------------------
// 2. Recuperación de información de base de datos para estadísticas
//-------------------------------------------------------------------------------------
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})
exports.pool = pool;

/*const pool = new Pool({
  user: 'roafuftzlbodfw',
  host: 'ec2-174-129-253-68.compute-1.amazonaws.com',
  database: 'denju6spl4b8r3',
  password: '4de5d39a241ccd2c452307e934530a509fb916c0745103095f24d3f1b13efe6c',
  port: 5432,
  ssl : true, // Permite acceso a la bdd remotamente (app localhost)
})*/

