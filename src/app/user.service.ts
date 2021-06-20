import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoginStatus=false

  constructor(private hc:HttpClient) { }
  createUser(userObj):Observable<any>
  {
    console.log(userObj)
    return this.hc.post("/users/createuser",userObj)
  }
  loginUser(credientials):Observable<any>
  {
    console.log(credientials)
    return this.hc.post("/users/login",credientials)
  }

}
