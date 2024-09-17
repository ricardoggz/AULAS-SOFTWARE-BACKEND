//Importar la conexióon de la bd
const { DatabaseModel } = require('../../models/DatabaseModel/index.js')
//iniciar la conexión
const database = new DatabaseModel()

//get

//post
function adminLogin(req, res){
    database.pool.getConnection(function(err, connection){
        //Evaluar error de conexión
        if(err) throw new Error('Algo falló en la conexión')
        connection.query(`
        SELECT * FROM administradores WHERE admin_usuario="${req.body.admin_usuario}"
        AND admin_contrasena="${req.body.admin_contrasena}"`,
        function(err, rows){
            if(err) throw new Error(err)
            if(rows.length === 0){
                connection.release()
                return res.json({
                    message: 'Datos incorrectos'
                })
            }else{
                connection.release()
                return res.json(rows)
            }
        }
        )
    })
}
//put

//delete

module.exports={
    adminLogin
}