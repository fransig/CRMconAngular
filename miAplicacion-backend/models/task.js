'use strict'

var mong= require('mongoose');
var Schema= mong.Schema;
var TaskSchema= Schema({
    description: String,
    realized: Boolean,
    employee:{type:Schema.ObjectId, ref: 'Employee'}
});

module.exports= mong.model('Task',TaskSchema);