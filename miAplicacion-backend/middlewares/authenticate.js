'use strict'
var jwt= require('jwt-simple');
var claveSecreta= 'clavesecreta_progrademia_angular_backend';
var moment= require('moment');


exports.ensureAuth= function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La cabecera no tiene autorizacion'});

    }
    var token= req.headers.authorization.replace(/['"]+/g,'');
    try {
        var payload= jwt.decode(token, claveSecreta);

        if(payload.exp <= moment().unix()){
            return res.status(404).send({message: 'token expirado'});
        }
    } catch (e) {
        return res.status(404).send({message: 'token no valido'});
    }
    req.employee=payload;
    next();
}