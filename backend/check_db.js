const fs = require('fs');
const path = require('path');

async function check() {
    console.log("=========================================");
    console.log("   COMPROBACIÓN DE BASE DE DATOS");
    console.log("=========================================");
    
    // 1. Verificar base de datos JSON local
    const jsonPath = path.join(__dirname, 'data/db.json');
    if (fs.existsSync(jsonPath)) {
        try {
            const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            console.log("\n[Base de Datos JSON Local] Encontrada con éxito.");
            console.log("Usuarios registrados en el archivo:");
            console.table(data.usuarios.map(u => ({ 
                id: u.id, 
                correo: u.correo, 
                rol: u.rol, 
                password_encriptada: u.password.substring(0, 20) + "..." 
            })));
        } catch (err) {
            console.error("[Base de Datos JSON Local] Error al leer archivo:", err.message);
        }
    } else {
        console.log("\n[Base de Datos JSON Local] No se encontró el archivo db.json en:", jsonPath);
    }

    // 2. Verificar MySQL (si está configurado y con dependencias)
    try {
        const db = require('./config/db');
        console.log("\n[MySQL] Conectando a la base de datos MySQL...");
        const [rows] = await db.query('DESCRIBE usuarios;');
        console.log("[MySQL] ¡Conexión exitosa! Estructura de la tabla 'usuarios':");
        console.table(rows);
    } catch (err) {
        console.log("\n[MySQL] No configurado o desconectado (Comportamiento normal en modo portátil).");
        console.log("Detalle técnico:", err.message);
    }
    
    process.exit(0);
}

check();
