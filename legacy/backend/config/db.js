// Archivo: backend/config/db.js
const mysql = require('mysql2');
require('dotenv').config(); // Carga las variables de seguridad del archivo .env

// Creamos un "pool" de conexiones (una forma robusta de manejar múltiples usuarios a la vez)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convertimos las funciones a Promesas para facilitar la lectura del código futuro
const promisePool = pool.promise();

module.exports = promisePool;