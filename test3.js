const ZKLib = require('./zklib');
const mysql = require('mysql2/promise');

async function insertAttendance(userId, attTime) {
    const dbConfig = {
        host: 'localhost', // o tu servidor de base de datos
        user: 'root',
        database: 'datab',
        password: 'gabi1212',
    };

    // Convertir attTime a formato compatible con MySQL (YYYY-MM-DD HH:MM:SS)
    const formattedAttTime = attTime.replace('T', ' ').substring(0, 19);

    const connection = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO RegistrosAsistencia (userId, attTime) VALUES (?, ?)`;
    await connection.execute(sql, [userId, formattedAttTime]);
    await connection.end();

    console.log(`Registro de asistencia insertado: ${userId} - ${formattedAttTime}`);
}

async function monitorAttendances() {
    const zkInstance = new ZKLib('192.168.0.125', 4370, 10000, 4000);
    try {
        await zkInstance.createSocket();
        console.log('Conectado al dispositivo, escuchando asistencias en tiempo real...');

        zkInstance.getRealTimeLogs(async (attendance) => {
            console.log('Registro de asistencia en tiempo real detectado:', attendance);
            // Asume que 'attendance' tiene la forma { userId: '1', attTime: Date }
            // Deberás ajustar esta línea si la estructura de datos es diferente
            await insertAttendance(attendance.userId, attendance.attTime.toISOString());
        });
    } catch (error) {
        console.error('Error al establecer la escucha de asistencias en tiempo real:', error);
    }
}

monitorAttendances();

