import { Injectable } from '@angular/core';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
public url:String;

  constructor(
    private _http: HttpClient
  ) {
    this.url= environment.url_api
   }

   getTasks(){
   
    return this._http.get<any>(this.url+'tasks')
    . pipe(map(task=> task));
  }
  getTask(taskId){
   
    return this._http.get<any>(this.url+'task/'+taskId)
    . pipe(map(task=> task));
  }

  addTask(taskAdd){

    let token= localStorage.getItem('token');

    const headers= new HttpHeaders().set("Authorization", token);

    return this._http.post<any>(this.url+'task', taskAdd, {headers:headers})
      .pipe(map(user=>user));

  }

  uptadeTask(task_update){

    let token= localStorage.getItem('token');
    if(token !=null){
      
      const headers= new HttpHeaders().set("Authorization", token);
      return this._http.put<any>(this.url+'task/'+task_update._id, task_update, {headers:headers})
      .pipe(map(task=>task));
     
    }
  }

  deleteTask(task_delete){

    let token= localStorage.getItem('token');
    if(token !=null){
      
      const headers= new HttpHeaders().set("Authorization", token);
      return this._http.delete<any>(this.url+'task/'+ task_delete,  {headers:headers})
      .pipe(map(task=>task));
     
    }

  }
  
}
