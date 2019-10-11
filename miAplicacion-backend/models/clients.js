'use strict'

var mong= require('mongoose');
var Schema= mong.Schema;
var ClientSchema= Schema({
    name:String,
    lastname:String,
    email:String,
    state:String,
    employee:{type:Schema.ObjectId, ref: 'Employee'}
});

module.exports= mong.model('Client',ClientSchema);