'use strict'
var express= require('express');
var bodyParser= require('body-parser');
var app= express();
var routes_employee= require('./routes/employee');
var routes_task= require('./routes/task');



//midleware

app.use(bodyParser.urlencoded({extender: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-control-Allow-Headers', 'Authorization, x-API-KEY,Origin, X-Requested-With, Content-Type,Accept,Access-Contro-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTION,PUT,DELETE') ;
    res.hasHeader ('Allow', 'GET,POST,OPTION,PUT,DELETE') ;
    next();
})

app.use('/api', routes_employee);
app.use('/api', routes_task);



module.exports= app;