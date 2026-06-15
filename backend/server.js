// Archivo: backend/server.js
// Version portable - sin MySQL, funciona en cualquier computadora.

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// --- 1. MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- 2. ARCHIVOS ESTATICOS (FRONTEND) ---
app.use(express.static(path.join(__dirname, '../frontend')));

// --- 3. RUTAS API ---
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Ignorar la peticion del favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Ruta base
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('');
    console.log('==========================================');
    console.log('   MATE SUPERIOR - Sistema de Gestion');
    console.log('==========================================');
    console.log('  Servidor corriendo en:');
    console.log('  http://localhost:' + PORT);
    console.log('');
    console.log('  Usuario por defecto:');
    console.log('  correo:    admin@matesuperior.com');
    console.log('  password:  admin123');
    console.log('==========================================');
    console.log('');
});