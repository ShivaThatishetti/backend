import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor{

  constructor() { }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<any>
  {
    //write intercept logic 
    let token=localStorage.getItem("token")
    if(token)
    {
      //add bearer token ot heder of req obj
      const clonedReqObj=req.clone({
        headers:req.headers.set("Authorization",`Bearer ${token}`)
      })
      //pass req obj to next interceptor or to api
      return next.handle(clonedReqObj)
    }
    else
    {
      return next.handle(req)
    }
  }
}
