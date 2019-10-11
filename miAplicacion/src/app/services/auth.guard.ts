import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {UserService} from './user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _userServ: UserService
    ){

    }
    canActivate(){
    let currentUser = this._userServ.getCurrentUser();
    if(currentUser&& currentUser._id){
        return true
    }else{
        this._router.navigate(['/login']);
        return false;
    }
    }
    

}
