const ZKLib = require('./zklib');
const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    database: 'datab',
    password: 'gabi1212',
};

const insertAttendance = async (attendance) => {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO marcaciones (uid, state, date, time, serial, type, ip, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;
    const { uid, state, timestamp, serial, type, ip } = attendance;
    const date = timestamp.toISOString().split('T')[0];
    const time = timestamp.toISOString().split('T')[1].split('.')[0];

    await connection.execute(sql, [uid, state, date, time, serial, type, ip]);
    await connection.end();
};

const getAndSaveAttendances = async () => {
    let zkInstance = new ZKLib('192.168.0.125', 4370, 10000, 4000);
    try {
        await zkInstance.createSocket();
        console.log(await zkInstance.getInfo());

        const { data: attendances } = await zkInstance.getAttendances();
        console.log(attendances);

        for (const attendance of attendances) {
            await insertAttendance({
                ...attendance,
                serial: 'SERIAL_AQUÍ', // Asumiendo que necesitas un valor para 'serial'
                type: 'TYPE_AQUÍ', // Asumiendo que necesitas un valor para 'type'
                ip: '192.168.0.125', // IP del dispositivo
            });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await zkInstance.disconnect();
    }
};

getAndSaveAttendances();
