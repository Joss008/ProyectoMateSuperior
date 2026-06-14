const db = require('./config/db');

async function check() {
    try {
        const [rows] = await db.query('DESCRIBE usuarios;');
        console.log("Estructura de la tabla usuarios:");
        console.table(rows);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
