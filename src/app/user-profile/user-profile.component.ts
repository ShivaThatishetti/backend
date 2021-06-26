import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private hc:HttpClient) { }
  userObj;
  ngOnInit(): void {
    //get user data from local storage
this.userObj=JSON.parse(localStorage.getItem("userObj"))
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
