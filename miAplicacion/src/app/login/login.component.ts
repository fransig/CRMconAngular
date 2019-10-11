import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public currentUser;
public userTokken;

  reactiveForm= this.formBuilder.group({
    email: ['',Validators.required],
    password: ['',{
      validators:[ Validators.required, Validators.minLength(5)]
    }],
    
   
  });

  constructor(
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userServ: UserService
  ) { }
  
  get email(){
    return this.reactiveForm.get('email');
  }
  get password(){
    return this.reactiveForm.get('password');
  }

  ngOnInit() { 
    if (this._route.snapshot.queryParams['registered']){
      console.log('registro correcto');
    }
    //console.log(localStorage.getItem('currentUser'))
    //console.log(this._userServ.getCurrentUser());
    //console.log(this._userServ.getToken());
  }

  
  onSubmit(){
    
this._userServ.login(this.reactiveForm.value)
.pipe(first()).subscribe(
    res=>{
      
      this.currentUser= res.findEmployee;
      if (this.currentUser && this.currentUser._id){

        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        this._userServ.login(this.reactiveForm.value, "true")
        .pipe(first()).subscribe(
          res=>{
              this.userTokken= res.token;
              if(this.userTokken){
                localStorage.setItem('token', this.userTokken);
              this._router.navigate(['/home']);
              }

          }, error=> {
            console.log('error');
          }
        )
      }

    }, error=>{
      console.log('error');
    }
)
  }

}
