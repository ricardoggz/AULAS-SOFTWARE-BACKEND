//Importar la conexióon de la bd
const { DatabaseModel } = require('../../models/DatabaseModel/index.js')
//iniciar la conexión
const database = new DatabaseModel()

function addEvent(req, res) {
    database.pool.getConnection(function (err, connection) {
        //Evaluar error de conexión
        if (err) throw new Error('Algo falló en la conexión')
        connection.query(`
            INSERT INTO eventos(
                evento_solicitante,
                evento_solicitante_cargo,
                evento_solicitante_departamento,
                evento_solicitante_extension,
                evento_nombre,
                evento_palabra_clave,
                evento_solicitante_correo_electronico,
                evento_fecha_inicio,
                evento_fecha_termino,
                evento_numero_dias,
                evento_numero_asistentes,
                evento_comentarios
            )
            VALUES(
                "${req.body.evento_solicitante}",
                "${req.body.evento_solicitante_cargo}",
                "${req.body.evento_solicitante_departamento}",
                "${req.body.evento_solicitante_extension}",
                "${req.body.evento_nombre}",
                "${req.body.evento_palabra_clave}",
                "${req.body.evento_solicitante_correo_electronico}",
                "${req.body.evento_fecha_inicio}",
                "${req.body.evento_fecha_termino}",
                "${req.body.evento_numero_dias}",
                "${req.body.evento_numero_asistentes}",
                "${req.body.evento_comentarios}"
            )
        `,
            function (err, rows) {
                if (err) throw new Error(err)
                return res.json({
                    rows: rows,
                    message: 'Registro agregado correctamente'
                })
            }
        )
    })
}
function getEvents(req, res) {
    database.pool.getConnection(function (err, connection) {
        //Evaluar error de conexión
        if (err) throw new Error('Algo falló en la conexión')
        connection.query(`SELECT * FROM eventos`,
            function (err, rows) {
                if (err) throw new Error(err)
                return res.json(rows)
            }
        )
    })
}
function getEventById(req, res) {
    database.pool.getConnection(function (err, connection) {
        //Evaluar error de conexión
        if (err) return res.status(500).json({ error: 'Algo ocurrió mal, intente más tarde' })
        connection.query(`SELECT * FROM eventos WHERE evento_id="${req.params.id}"`,
            function (err, rows) {
                //valida la query
                if (err) return res.status(500).json({ error: 'Algo ocurrió mal, intente más tarde' })
                //valida que exista un registro
                if (rows.length < 1) return res.status(404).json({ error: 'Registro no encontrado' })
                //retorna una registro válido
                return res.status(200).json(rows)
            }
        )
    })
}
function getDateById(req, res) {
    database.pool.getConnection(function (err, connection) {
        //Evaluar error de conexión
        if (err) return res.status(500).json({ error: 'Algo ocurrió mal, intente más tarde' })
        connection.query(`SELECT * FROM fechas WHERE evento_id="${req.params.id}"`,
            function (err, rows) {
                //valida la query
                if (err) return res.status(500).json({ error: 'Algo ocurrió mal, intente más tarde' })
                //valida que exista un registro
                if (rows.length < 1) return res.status(404).json({ error: 'Registro no encontrado' })
                //retorna una registro válido
                return res.status(200).json(rows)
            }
        )
    })
}
function addDate(req, res) {
    database.pool.getConnection(function (err, connection) {
        //Evaluar error de conexión
        if (err) return res.status(500).json({ error: 'Algo ocurrió mal, intente más tarde' })
        connection.query(
            `INSERT INTO fechas(
                fecha_completa,
                fecha_dia,
                fecha_horario,
                fecha_espacio,
                evento_id
            )
            VALUES(
                "${req.body.fecha_completa}",
                "${req.body.fecha_dia}",
                "${req.body.fecha_horario}",
                "${req.body.fecha_espacio}",
                "${req.body.evento_id}"
            )`,
            function (err, rows) {
                //valida la query
                if (err) return res.status(500).json({ error: err })
                //valida que exista un registro
                if (rows.length < 1) return res.status(404).json({ error: 'Registro no encontrado' })
                //retorna una registro válido
                return res.status(200).json(rows)
            }
        )
    })
}
module.exports = {
    addEvent,
    getEvents,
    getEventById,
    getDateById,
    addDate
}