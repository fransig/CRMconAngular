'use strict'


var express= require('express');
var EmployeeController= require('../controllers/employee');
var api= express.Router();
var mid_auth= require(('../middlewares/authenticate'));

api.get('/prueba-controlador',mid_auth.ensureAuth, EmployeeController.prueba);
api.post('/register', EmployeeController.saveEmployee);
api.post('/login', EmployeeController.login);
api.put('/update-employee/:id',mid_auth.ensureAuth, EmployeeController.updateEmployee);



module.exports= api;