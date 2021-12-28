const express = require('express');
require('dotenv').config();
const routes = require('./routes/auth');
const routeEvent=require('./routes/events');
const {dbConnection}=require('./database/config');
const cors=require('cors');



//Crear el Servidor de express
const app = express();
//Base de datos
dbConnection()

//CORS
app.use(cors())
//Directorio Publico
app.use( express.static('public'));
//lectura y parseo del body
app.use(express.json())

//Rutas
app.use('/api/auth',routes),
app.use('/api/event',routeEvent);

//Escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})