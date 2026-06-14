// Archivo: backend/controllers/authController.js
const db = require('../config/db'); // <-- Aquí ya está la ruta corregida que hicimos antes
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Función para manejar el Inicio de Sesión
const login = async (req, res) => {
    // 1. Recibimos el correo y la contraseña
    const { correo, password } = req.body;

    try {
        // 2. Buscamos al usuario en la base de datos
        const [usuarios] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

        if (usuarios.length === 0) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
        }

        const usuarioEncontrado = usuarios[0];

        // 3. Verificamos la contraseña encriptada con bcrypt
        const passwordValida = await bcrypt.compare(password, usuarioEncontrado.password);

        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
        }

        // 4. Creamos el Token de seguridad usando la variable de entorno
        const token = jwt.sign(
            { id: usuarioEncontrado.id, rol: usuarioEncontrado.rol },
            process.env.JWT_SECRET || 'fallback_secret_for_dev_only', 
            { expiresIn: '2h' } 
        );

        // 5. Respondemos al Frontend
        res.json({
            mensaje: 'Inicio de sesión exitoso',
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
        return res.status(400).json({ mensaje: 'Por favor, proporciona correo y contraseña' });
    }

    try {
        // 1. Verificar si el usuario ya existe
        const [existentes] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        if (existentes.length > 0) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        // 2. Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 3. Insertar el usuario en la base de datos (con rol 'cliente' por defecto)
        await db.query('INSERT INTO usuarios (correo, password, rol) VALUES (?, ?, ?)', [correo, hashedPassword, 'cliente']);

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
        const [usuarios] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        
        // Aunque no exista, no se debe revelar para evitar ataques de enumeración
        if (usuarios.length === 0) {
            return res.json({ mensaje: 'Si el correo existe en nuestro sistema, hemos enviado un enlace de recuperación.' });
        }

        // Simulación: Generar un token falso y mostrarlo en consola
        const resetToken = jwt.sign({ id: usuarios[0].id }, process.env.JWT_SECRET || 'fallback_secret_for_dev_only', { expiresIn: '15m' });
        console.log(`\n--- SIMULACIÓN DE CORREO ---`);
        console.log(`Para: ${correo}`);
        console.log(`Asunto: Recuperación de contraseña`);
        console.log(`Mensaje: Haz clic en el siguiente enlace para recuperar tu contraseña (validez 15min):`);
        console.log(`http://localhost:3000/api/auth/reset-password?token=${resetToken}`);
        console.log(`----------------------------\n`);

        res.json({ mensaje: 'Si el correo existe en nuestro sistema, hemos enviado un enlace de recuperación.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno del servidor al procesar la solicitud' });
    }
};

module.exports = { login, register, forgotPassword };