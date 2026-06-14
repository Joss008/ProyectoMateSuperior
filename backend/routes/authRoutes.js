// Archivo: backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Creamos una ruta POST (para enviar datos ocultos) en /login
// Cuando alguien llame a esta ruta, se ejecutará la función login de nuestro controlador
router.post('/login', authController.login);

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para la recuperación de contraseña simulada
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;