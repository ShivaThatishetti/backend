import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  datasource=new BehaviorSubject<any>(0)
  dataObservable=this.datasource.asObservable()

  updateDataObservable(data)
  {
    this.datasource.next(data)
  }


  userLoginStatus=false

  constructor(private hc:HttpClient) {
    if(localStorage.getItem("username")!==null){
    this.userLoginStatus=true}
   }
  createUser(userObj):Observable<any>
  {
    return this.hc.post("/users/createuser",userObj)
  }
  loginUser(credientials):Observable<any>
  {
    return this.hc.post("/users/loginuser",credientials)
  }
  loginAdmin(credientials):Observable<any>
  {
    return this.hc.post("/users/loginadmin",credientials)
  }
  //send product to user cart
  sendProductToUserCart(userProObj):Observable<any>
  {
    return this.hc.post("/users/addtocart",userProObj)
  }
  //get products from cart
  getProductsFromCart(username):Observable<any>
  {
    return this.hc.get(`/users/getproducts/${username}`)
  }
  //delete product from user cart
  deleteProductFromUserCart(username,index):Observable<any>
  {
    return this.hc.delete(`/users/deleteproducts/${username}`,index)
  }

}
