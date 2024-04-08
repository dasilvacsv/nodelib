const mysql = require('mysql2/promise');

const insertAttendance = async (userId, attTime) => {
    const connection = await mysql.createConnection({
        host: 'localhost', // o tu servidor de base de datos
        user: 'root',
        database: 'datab',
        password: 'gabi1212',
    });

    const sql = `INSERT INTO RegistrosAsistencia (userId, attTime) VALUES (?, ?)`;
    await connection.execute(sql, [userId, attTime]);
    await connection.end();

    console.log(`Registro de asistencia insertado: ${userId} - ${attTime}`);
};

// Datos de prueba basados en tu ejemplo
const testData = [
    { userId: '1', attTime: new Date('2024-04-08T00:41:52.000Z') },
    { userId: '1', attTime: new Date('2024-04-08T00:42:08.000Z') }
];

testData.forEach(data => insertAttendance(data.userId, data.attTime));
