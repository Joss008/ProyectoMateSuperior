// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'matesuperior_secreto_para_demo_feria_2024';

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        
        jwt.verify(req.token, JWT_SECRET, (error, authData) => {
            if (error) {
                return res.status(403).json({ mensaje: 'Token inválido o expirado' });
            }
            req.usuario = authData;
            next();
        });
    } else {
        res.status(401).json({ mensaje: 'Acceso denegado, no se proporcionó token' });
    }
};

module.exports = { verifyToken };
