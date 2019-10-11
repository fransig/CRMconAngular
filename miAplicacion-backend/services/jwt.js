'use strict'

var jwt= require('jwt-simple');
var claveSecreta= 'clavesecreta_progrademia_angular_backend';
var moment= require('moment');


exports.createToken= function(employee){
    var payload= {
        sub: employee._id,
        name: employee.name,
        lastname: employee.lastname,
        email: employee.email,
        isAdmin: employee.isAdmin,
        iat: moment().unix(),
        exp: moment().add(20, 'days').unix
    }
    return jwt.encode(payload,claveSecreta)
}