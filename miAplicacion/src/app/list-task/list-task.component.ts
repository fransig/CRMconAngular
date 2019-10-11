import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import {TaskService} from '../services/task.service';
import {first} from 'rxjs/operators';
import { Task } from '../models/task';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  public title: string;
  public tasks:Task[];

  constructor(
    
    private _route: ActivatedRoute,
    private _router: Router,
    private _taskServ: TaskService
  ) {
    this.title= 'Listado de tareas'
   }

  ngOnInit() {
    
    this.getTasks();
      
    }
    
    getTasks(){
      
      this._taskServ.getTasks().pipe().subscribe(
      res=>{
               
          if(!res.tasks){
                console.log('Error al cargar')
          }else{
            this.tasks= res.tasks;
          }
      },err=>{
  console.log(err)
      }
    )
    }


    

  deleteTask(idTask){
    this._taskServ.deleteTask(idTask).pipe().subscribe(
      res=>{
               
          if(res.tasks){
                console.log('Error al borrar tarea')
          }else{
              this.getTasks();
          }
      },err=>{
              console.log(err)
      }
    );
  }
  }


