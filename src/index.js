const cors = require('cors')
const express = require('express')
const { adminLogin }= require('./controllers/AdminController/index.js')

//Se ejecuta express
const server = express()

//El servidor estaá corriendo en el puerto 3030 (localhost:3030)
server.listen(3030)

//Rutas (endpoints) - Ejemplo: 'localhost:3030/eventos'
//http: Hyper Text Trnasfer Protocol
//https: Hyper Text Trnasfer Protocol - SSL
//get: recibe información del servidor
//post: Se manda información al servidor
//put: Actualizar información del servidor
//delete: eliminar información del servidor

//procesar formato json
server.use(express.json())

//procesar peticiones de diferentes direcciones
server.use(cors())

server.get('/', (req, res)=>{
    res.send('Servidor Activo')
})
server.get('/eventos', (req, res)=>{
    res.json('Eventos')
})
server.post('/admin-login', adminLogin)
