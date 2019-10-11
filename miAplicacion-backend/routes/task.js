'use strict'


var express= require('express');
var TaskController= require('../controllers/task');
var api= express.Router();
var mid_auth= require(('../middlewares/authenticate'));

api.post('/task',mid_auth.ensureAuth, TaskController.saveTask);
api.get('/tasks', TaskController.getTasks);
api.get('/task/:id', TaskController.getTask);
api.put('/task/:id',mid_auth.ensureAuth, TaskController.updateTask);
api.delete('/task/:id',mid_auth.ensureAuth, TaskController.deleteTask);


module.exports= api;