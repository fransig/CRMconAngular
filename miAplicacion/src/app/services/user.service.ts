import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url:String;
  public currentUser;
  public token;

  constructor(
    private _http: HttpClient
  ) {
    this.url= environment.url_api
   }

  register(user_register){
    return this._http.post(this.url+'register', user_register);
  }

  login(user_login, gettoken= null){
    if(gettoken != null){
      user_login.gettoken= gettoken;
    }
    return this._http.post<any>(this.url+'login', user_login)
    . pipe(map(user=> user));
  }
  getCurrentUser(){
    let currentUser= JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != "undefined"){
      this.currentUser= currentUser;
    }else{

      this.currentUser= null
    }
    return this.currentUser;
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != "undefined"){
      this.token= token;
    }else{
      this.token= null;
    }
    return this.token;
  }

  uptadeEmployee(user_update){

    let token= this.getToken();
    if(token !=null){
      
      const headers= new HttpHeaders().set("Authorization", token);
      return this._http.put<any>(this.url+'update-employee/'+user_update._id, user_update, {headers:headers})
      .pipe(map(user=>user));
     
    }
   

  }


}
