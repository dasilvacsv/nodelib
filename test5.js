const ZKLib = require('./zklib');
const mysql = require('mysql2/promise');
const {pool} = require('./db.js') 

async function insertAttendance(userId, attTime) {
    // Convert attTime to a format compatible with PostgreSQL (YYYY-MM-DD HH:MM:SS)
    const formattedAttTime = attTime.replace('T', ' ').substring(0, 19);
  
    const sql = `INSERT INTO "RegistrosAsistencia" ("userId", "attTime") VALUES ($1, $2)`;
    try {
      await pool.query(sql, [userId, formattedAttTime]);
      console.log(`Attendance record inserted: ${userId} - ${formattedAttTime}`);
    } catch (error) {
      console.error('Error inserting attendance record:', error);
    }
  }

async function monitorAttendances() {
    const zkInstance = new ZKLib('192.168.1.225', 4370, 10000, 4000);
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

