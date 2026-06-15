// Archivo: backend/controllers/authController.js
// Version sin MySQL - usa archivo JSON como base de datos.

const jsonDb = require('../config/jsonDb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'matesuperior_secreto_para_demo_feria_2024';

// Función para manejar el Inicio de Sesión
const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        // 1. Buscar el usuario en el archivo JSON
        const usuarios = jsonDb.findUsuarios({ correo });

        if (usuarios.length === 0) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
        }

        const usuarioEncontrado = usuarios[0];

        // 2. Verificar la contraseña encriptada con bcrypt
        const passwordValida = await bcrypt.compare(password, usuarioEncontrado.password);

        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
        }

        // 3. Crear el Token JWT
        const token = jwt.sign(
            { id: usuarioEncontrado.id, rol: usuarioEncontrado.rol },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        // 4. Responder al Frontend
        res.json({
            mensaje: 'Inicio de sesion exitoso',
            token: token,
            rol: usuarioEncontrado.rol
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para registrar un nuevo usuario
const register = async (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ mensaje: 'Por favor, proporciona correo y contrasena' });
    }

    try {
        // 1. Verificar si el usuario ya existe
        const existentes = jsonDb.findUsuarios({ correo });
        if (existentes.length > 0) {
            return res.status(400).json({ mensaje: 'El correo ya esta registrado' });
        }

        // 2. Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Insertar el usuario en el archivo JSON (con rol 'cliente' por defecto)
        jsonDb.insertUsuario({ correo, password: hashedPassword, rol: 'cliente' });

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno del servidor al registrar' });
    }
};

// Función simulada para recuperación de contraseña
const forgotPassword = async (req, res) => {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({ mensaje: 'Por favor, proporciona tu correo' });
    }

    try {
        const usuarios = jsonDb.findUsuarios({ correo });

        if (usuarios.length === 0) {
            return res.json({ mensaje: 'Si el correo existe en nuestro sistema, hemos enviado un enlace de recuperacion.' });
        }

        const resetToken = jwt.sign({ id: usuarios[0].id }, JWT_SECRET, { expiresIn: '15m' });
        console.log('\n--- SIMULACION DE CORREO ---');
        console.log('Para: ' + correo);
        console.log('Enlace de recuperacion (valido 15min):');
        console.log('http://localhost:3000/api/auth/reset-password?token=' + resetToken);
        console.log('----------------------------\n');

        res.json({ mensaje: 'Si el correo existe en nuestro sistema, hemos enviado un enlace de recuperacion.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

module.exports = { login, register, forgotPassword };