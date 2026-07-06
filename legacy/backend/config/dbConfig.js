// backend/config/dbConfig.js
const jsonDb = require('./jsonDb');
let mysqlDb = null;

try {
    mysqlDb = require('./db');
} catch (e) {
    console.log("No se pudo cargar la base de datos MySQL, asegúrate de que el módulo mysql2 esté instalado y configurado correctamente.");
}

const USE_MYSQL = process.env.DB_TYPE === 'mysql';

// Función auxiliar para retornar los mismos formatos
const dbConfig = {
    findUsuarios: async (criterio = {}) => {
        if (USE_MYSQL && mysqlDb) {
            try {
                // Generar query dinámicamente basado en el criterio
                const keys = Object.keys(criterio);
                const values = Object.values(criterio);
                
                let query = 'SELECT * FROM usuarios';
                if (keys.length > 0) {
                    const whereClause = keys.map(k => `${k} = ?`).join(' AND ');
                    query += ` WHERE ${whereClause}`;
                }
                
                const [rows] = await mysqlDb.execute(query, values);
                return rows;
            } catch (error) {
                console.error("Error MySQL findUsuarios:", error);
                return [];
            }
        } else {
            return jsonDb.findUsuarios(criterio);
        }
    },
    
    insertUsuario: async (nuevoUsuario) => {
        if (USE_MYSQL && mysqlDb) {
            try {
                const keys = Object.keys(nuevoUsuario);
                const values = Object.values(nuevoUsuario);
                
                const placeholders = keys.map(() => '?').join(', ');
                const columns = keys.join(', ');
                
                const query = `INSERT INTO usuarios (${columns}) VALUES (${placeholders})`;
                const [result] = await mysqlDb.execute(query, values);
                
                return { id: result.insertId, ...nuevoUsuario };
            } catch (error) {
                console.error("Error MySQL insertUsuario:", error);
                throw error;
            }
        } else {
            return jsonDb.insertUsuario(nuevoUsuario);
        }
    },
    
    updateUsuario: async (id, datosActualizados) => {
        if (USE_MYSQL && mysqlDb) {
            try {
                const keys = Object.keys(datosActualizados);
                const values = Object.values(datosActualizados);
                
                const setClause = keys.map(k => `${k} = ?`).join(', ');
                const query = `UPDATE usuarios SET ${setClause} WHERE id = ?`;
                
                const [result] = await mysqlDb.execute(query, [...values, id]);
                
                if (result.affectedRows === 0) return null;
                
                return { id, ...datosActualizados }; // Retorno simplificado
            } catch (error) {
                console.error("Error MySQL updateUsuario:", error);
                return null;
            }
        } else {
            return jsonDb.updateUsuario(id, datosActualizados);
        }
    }
};

module.exports = dbConfig;
