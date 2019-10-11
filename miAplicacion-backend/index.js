'use strict'
var mong= require('mongoose');
var app= require('./app');
var port= process.env.port || 4567;


mong.Promise= global.Promise;
mong.connect('mongodb://localhost:27017/miaplicacion')
	.then(()=>{
		console.log("La conexion se ha cargado correctamente")
        app.listen(port,()=>{
            console.log('servidor arrancado');
        })
    }).catch(err=> console.log(err));
	
	