const { Turnos, Admin } = require('../../db');

const createTurno = async (turnoData) => {
    const { fecha, hora, servicio } = turnoData;

    // Obtén el último adminId creado
    const lastAdmin = await Admin.findOne({
        order: [['createdAt', 'DESC']],
        attributes: ['id'],
    });

    const adminId = lastAdmin ? lastAdmin.id : null; // Asigna el id del último Admin

    if (!adminId) {
        throw new Error("No se encontró un Admin para asociar con el Turno.");
    }

    const newTurno = await Turnos.create({
        fecha,
        hora,
        servicio,
        AdminId: adminId,
    });

    const result = await Turnos.findOne({
        where: {
            id: newTurno.id,
        },
        attributes: ['id', 'fecha', 'hora', 'servicio'],
    });

    return result;
};

module.exports = {
    createTurno,
};
