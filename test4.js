function decodeAttendanceRecord(buffer) {
    let offset = 0;
    const records = [];
    while (offset < buffer.length) {
        const userSn = buffer.readUIntLE(offset, 2);
        offset += 2;
        const userId = buffer.toString('ascii', offset, offset + 9).replace(/\0/g, '');
        offset += 9;
        // Salta los bytes fijos
        offset += 15;
        const verifyType = buffer.readUInt8(offset);
        offset += 1;
        const recordTime = parseTimeToDate(buffer.readUInt32LE(offset));
        offset += 4;
        const verifyState = buffer.readUInt8(offset);
        offset += 1;
        // Salta los bytes fijos al final
        offset += 8;

        records.push({ userSn, userId, verifyType, recordTime, verifyState });
    }
    return records;
}

function parseTimeToDate(timeVal) {
    // Convertir el valor de tiempo a un objeto Date como se describe en tu función PHP
    // Asume que `timeVal` es el valor decodificado en formato little endian
    // Debes ajustar esta función basada en cómo se espera que `timeVal` sea decodificado
}

    async getAttendances(callbackInProcess = () => {}) {
    // Tu código existente aquí para preparar y enviar la solicitud CMD_DATA_WRRQ...

    let data = null;
    try {
        data = await this.readWithBuffer(REQUEST_DATA.GET_ATTENDANCE_LOGS, callbackInProcess);
    } catch (err) {
        return Promise.reject(err);
    }

    // Asumiendo que 'data.data' contiene el buffer de registros de asistencia
    const attendanceRecords = decodeAttendanceRecord(data.data);

    return { data: attendanceRecords, err: data.err };
}
