import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private hc:HttpClient,private us:UserService) { }
  userObj;
  count;
  ngOnInit(): void {
    //get user data from local storage
   this.userObj=JSON.parse(localStorage.getItem("userObj"))
   //get user cart obj datta from api
   
    this.us.getProductsFromCart(this.userObj.username).subscribe(
      res=>{
        if(res.message=="User cart is empty"){this.us.updateDataObservable(0)}
        else{this.us.updateDataObservable(res)}//res.message
        this.us.dataObservable.subscribe(proObj=>{
          if(proObj.length===0){this.count=0}
          else{this.count=proObj.length}
        })
      },
      err=>{console.log("Error in get products from user cart",err);alert("Something went wrong")}
    )
  }
cart=[]
  getPrivateData()
  {
    console.log("This is Private Data")
    
    this.hc.get("/users/testing").subscribe(
      res=>{
        alert(res['message'])
      },
      err=>{
        alert(err)
      }
    )
  }
  cartItems()
  {
    if(this.cart.length===0)
    console.log("Cart is empty")
    else
    console.log(this.cart)
  }

}
