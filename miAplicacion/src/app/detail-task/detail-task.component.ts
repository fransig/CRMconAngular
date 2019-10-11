import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TaskService} from '../services/task.service';
import { Task } from '../models/task';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css']
})
export class DetailTaskComponent implements OnInit {
public task:Task;
public status: boolean;
public mensajeMostrar: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _taskServ: TaskService
  ) { }

  ngOnInit() {
    this.getTask(this._route.snapshot.params.id);

    this.status=true;
  }
getTask(idTask){
  this._taskServ.getTask(idTask).pipe().subscribe(
    res=> {
        if(!res.task){
          console.log('Error al buscar tarea');
        }else{
          this.task= res.task;
        }

    },err=> {
      console.log(err)
    }
  )
}

onSubmit(){
  
  this._taskServ.uptadeTask(this.task).pipe(first()).subscribe(
  res=>{
    console.log(res);

    if( res.task && res.task._id){
      this.task= res.task;
      this.status= true;
      this._router.navigate(['/listado-tareas']);
    }else{
      this.status= false;
      this.mensajeMostrar= res.task.message;
    }
    

}, err=> {
  this.status= false;
  this.mensajeMostrar= err.message;
}
 )


}

}

