import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import {Router, ActivatedRoute} from '@angular/router';
import {TaskService} from '../services/task.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  public title: string;
  public status: boolean;
  public mensajeMostrar: string;
  public task: Task;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _taskServ: TaskService
  ) {

    this.title='Añadir tarea';
    this.task=new Task('','',false,'');
    this.status=true;


   }

  ngOnInit() {
  }

  onSubmit(){
    
    this._taskServ.addTask(this.task).pipe().subscribe(
      res=>{
        
    
        if( !res.task ){
          console.log('Error al  crear tarea')
          
          this.status= false;
          this.mensajeMostrar= 'Error al  crear tarea';
          
        }else{
          this.task= res.task;
          this.status= true;
          this._router.navigate(['/listado-tareas']);
        }
        
    
    }, err=> {
      console.log(err);
      this.status= false;
          this.mensajeMostrar= err;
    }
    )
  }

}
