'use strict'
//modulos


//modelos
var Employee= require('../models/employee');
var Task= require('../models/task')


//metodos
function saveTask(req,res){
    var task = new Task();
    var params = req.body;

    if(params.description){
        task.description= params.description;
        task.realized= params.realized;
        task.employee= req.employee.sub;

        task.save()
        .then(function(taskStored){
            if (!taskStored){
                res.status(404).send({message: 'No se ha registrado la tarea'});
            }else{
                res.status(200).send({task: taskStored});
            }
        }).catch(err=>res.status(500).send({message: 'Error al guardar la tarea'}));
    }else{
        res.status(200).send({message: ' La descripcion es obligatoria'});
    }
}
function getTasks(req,res){
    Task.find({}).populate({path: 'employee'})
        .exec(function(err, tasks){
            if(!tasks){
                res.status(404).send({message: 'No hay tareas'});
            }else{
                res.status(200).send({tasks});
            }
        })
}

function getTask(req,res){
var taskId= req.params.id;

    Task.findById(taskId).populate({path: 'employee'})
        .exec(function(err, task){
            if(!task){
                res.status(404).send({message: 'No existe la tarea'});
            }else{
                res.status(200).send({task});
            }
        })
}


function updateTask(req,res){

    var idTask= req.params.id;
    var update= req.body;

    Task.findByIdAndUpdate(idTask, update, {new: true})
            .then(function(taskUpdated){
                if (!taskUpdated){
                    res.status(404).send({message: 'No se ha actualizado  la tarea'});
                }else{
                    res.status(200).send({task: taskUpdated});
                }

            }).catch(err=>res.status(500).send({message: 'Error al actualizar la tarea'}));
}

function deleteTask(req,res)
{
    var idTask= req.params.id;
    
    Task.findByIdAndRemove(idTask)
    .then(function(taskRemove){
            if (!taskRemove){
                res.status(404).send({message: 'No se ha borrado  la tarea'});
            }else{
                res.status(200).send({task: taskRemove});
            }

        }).catch(err=>res.status(500).send({message: 'Error al borrar la tarea'}));
}


module.exports={
    saveTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
}