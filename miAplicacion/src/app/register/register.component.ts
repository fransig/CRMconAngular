import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import {Personal}from '../models/personal';

import {UserService} from '../services/user.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public personal: Personal;
  public status: boolean;
  public mensajeMostrar: string;
    constructor(
      private _userServ: UserService,
      private _router: Router
    ) { 
      this.personal= new Personal('','','','', '', false);
      this.status=true;
    }
  
    ngOnInit() {
      
      
    }
    onSubmit(){
     
      // console.log(this.personal);

      this._userServ.register(this.personal).pipe(first())
      .subscribe(
        res=>{
         
         if(res.hasOwnProperty('message')){

          this.mandarMensaje(res);
            
         }else{
           this.status= true;
           this._router.navigate(['/login'],{queryParams: {registered: true}});

          
         }
        },error=>{
         this.status= false;
         this.mensajeMostrar= error;
        }
        
      )
    }
    mandarMensaje(mensaje){
      this.status= false;
      this.mensajeMostrar= mensaje.message
    }

}
