'use strict'
//modulos
var bcrypt= require('bcrypt');

var jwt = require('../services/jwt');

//modelos
var Employee= require('../models/employee');


//metodos
function saveEmployee(req, res){
    var employee= new Employee();
    var params= req.body;
    var salt_round=10;
    console.log(params);
    if (params.name&& params.email &&params.password){
        employee.name= params.name;
        employee.lastname= params.lastname;
        employee.email= params.email;
        employee.isAdmin= false;

        Employee.findOne({email: employee.email.toLowerCase()})
            .then(function(findEmployee){
                if (!findEmployee){
                    bcrypt.hash(params.password,salt_round)
                    .then(function(hashesPassword){
                        employee.password= hashesPassword;
            
                        employee.save().then(function(employeeStored){
                            if(!employeeStored){
                                res.status(404).send({message: 'No se ha registrado'})
                            }else{
                                res.status(200).send({employee: employeeStored})
                            }
                        }).catch(err=>res.status(500).send({message: 'Error al guardar el empleado'}));
                    
                    }).catch(err => console.log(err));
                
                      //  res.status(200).send({ message: 'Empleado guardado' });

                }else{
                    res.status(200).send({message: 'Ya existe un empleado con ese email'})
                }
            }

            ).catch(err => res.status(500).send({message: 'Error al buscar empleado'}))

        
    }else{
        res.status(200).send({
        message: 'Se debe rellenar los datos requeridos'
         });
    }
    
    }

function login(req, res){
    var params= req.body;
    var email= params.email;
    var password= params.password;

    Employee.findOne({email: email})
        .then(function(findEmployee){
            if(!findEmployee){

                res.status(404).send({message: 'El usuario no existe'})
            }else{
                bcrypt.compare(password,findEmployee.password)
                .then(function(check){
                    if(check){
                        if(params.gettoken){
                            res.status(200).send({ 
                                token: jwt.createToken(findEmployee)
                            })
                        }else{
                             res.status(200).send({findEmployee});
                        }
                       
                        
                    }else{
                        res.status(404).send({message: 'El email o contraseña no son validos'});
                    }
                }).catch(err=> console.log(err))
            }
        }).catch(err=> res.status(500).send({message: 'Error al loguearse'}));
}
function prueba(req,res){
    res.status(404).send({employee: req.employee});
}

function updateEmployee(req,res){
   
    var idEmployee= req.params.id;
    var update= req.body;
    
    if (idEmployee != req.employee.sub){
         return res.status(200).send({message: 'alerta',employee: req.employee}); 
    }
    
    Employee.findByIdAndUpdate(idEmployee, update)
    .then(function(employeeUpdated){
        if (!employeeUpdated){
            res.status(404).send({message: 'El usuario no existe', employee: req.employee});
        }else {
            res.status(200).send({employee: req.employee, message:'actualizado correctamente con el nombre'+ req.employee.name});
        }

    }).catch(err=>console.log(err));
}


module.exports={
    saveEmployee,login, prueba,updateEmployee
}