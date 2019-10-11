import { Component, OnInit } from '@angular/core';
import { Personal} from '../models/personal';
import { UserService } from '../services/user.service';
import {first} from 'rxjs/operators';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {
  public title: string;
  public personal:Personal;
  public currentUser;
  public token;
  public mensajeMostrar: string;
  public status:boolean;

  constructor(
    private _userServ: UserService,
    private _router:Router
  ) {
    this.title= 'Mis Datos';
    this.currentUser= this._userServ.getCurrentUser();
    this.token= this._userServ.getToken();
    this.personal= this.currentUser;
    this.mensajeMostrar='';

    this.status=true;
    
   }

  ngOnInit() {

   }

   onSubmit(){
     this._userServ.uptadeEmployee(this.personal).pipe(first()).subscribe(
      res=>{
        

        if( this.currentUser && this.currentUser._id){
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.status= true;
          this._router.navigate(['/home']);
        }else{
          this.status= false;
          this.mensajeMostrar= this.currentUser.message;
        }
        

    }, err=> {
      this.status= false;
      this.mensajeMostrar= err;
    }
     )
   }

}
