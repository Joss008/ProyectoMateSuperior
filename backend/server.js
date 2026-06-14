// Archivo: backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); 

const app = express();

// --- 1. MIDDLEWARES (Traductores y Seguridad) ---
// ¡EL ORDEN AQUÍ ES VITAL!
app.use(cors()); 
app.use(express.json()); // <--- ¡Esta línea traduce el correo y la contraseña!

// --- 2. ARCHIVOS ESTÁTICOS (FRONTEND) ---
// Esto permite que el servidor entregue los archivos HTML, CSS y JS
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));

// --- 3. RUTAS API ---
// Tienen que ir obligatoriamente DESPUÉS de express.json()
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Ignorar la petición del favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Prueba de conexión a la base de datos
db.query('SELECT 1')
    .then(() => {
        console.log('✅ Conexión a la base de datos MySQL exitosa.');
    })
    .catch((error) => {
        console.error('❌ Error conectando a la base de datos:', error.message);
    });

// Ruta base
app.get('/', (req, res) => {
    res.send('¡El servidor está en línea y conectado!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor arrancado en http://localhost:${PORT}`);
});