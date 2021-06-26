import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  constructor(private us:UserService) { }
  products;
  cartStatus:boolean
  ngOnInit(): void {
     
    let username=localStorage.getItem("username")
    this.us.getProductsFromCart(username).subscribe(
      res=>{
        if(res['message']==="User cart is empty"){this.cartStatus=false}
        else{this.cartStatus=true;this.products=res}
      }
      ,err=>{
      console.log("Error in reading cart products",err)
      alert("Something went wrong")
    })
  }

}
