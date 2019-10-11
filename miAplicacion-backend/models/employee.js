'use strict'

var mong= require('mongoose');
var Schema= mong.Schema;

var EmployeeSchema= Schema({
    name:String,
    lastname:String,
    email:String,
    password:String,
    isAdmin: Boolean
});

module.exports= mong.model('Employee',EmployeeSchema);