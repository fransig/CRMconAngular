import { Component, DoCheck, OnInit } from '@angular/core';
import {UserService} from './services/user.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck{
  public title:string;
  public currentUser;



constructor(
  private _userServ: UserService,
  private _router: Router
){
  this.title='miAplicacion';
}
ngOnInit(){

  this.currentUser = this._userServ.getCurrentUser();
}

ngDoCheck(){

  this.currentUser = this._userServ.getCurrentUser();
}
logout(){
  localStorage.clear();
  this.currentUser= null;
  this._router.navigate(['/login']);
}

}
