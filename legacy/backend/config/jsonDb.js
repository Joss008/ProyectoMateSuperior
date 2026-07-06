// backend/config/jsonDb.js
// Reemplaza MySQL con un archivo JSON local.
// Funciona sin instalar ningun servicio externo.

const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "../data/db.json");

// Leer la base de datos desde el archivo JSON
function leerDB() {
    try {
        const data = fs.readFileSync(DB_PATH, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return { usuarios: [] };
    }
}

// Guardar la base de datos en el archivo JSON
function guardarDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

const jsonDb = {
    findUsuarios: (criterio = {}) => {
        const db = leerDB();
        return db.usuarios.filter(usuario => {
            return Object.entries(criterio).every(([key, val]) => usuario[key] === val);
        });
    },
    insertUsuario: (nuevoUsuario) => {
        const db = leerDB();
        const nextId = db.usuarios.length > 0 ? Math.max(...db.usuarios.map(u => u.id)) + 1 : 1;
        const usuarioConId = { id: nextId, ...nuevoUsuario };
        db.usuarios.push(usuarioConId);
        guardarDB(db);
        return usuarioConId;
    },
    updateUsuario: (id, datosActualizados) => {
        const db = leerDB();
        const index = db.usuarios.findIndex(u => u.id === id);
        if (index === -1) return null;
        db.usuarios[index] = { ...db.usuarios[index], ...datosActualizados };
        guardarDB(db);
        return db.usuarios[index];
    }
};

module.exports = jsonDb;
