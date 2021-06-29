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
  function()
  {
    this.us.dataObservable.subscribe(
      res=>{
        if(res.length===0){this.cartStatus=false}
        else{this.cartStatus=true;this.products=res;}
      }
      ,err=>{
      console.log("Error in reading cart products",err)
      alert("Something went wrong")
    })
  }
  ngOnInit(): void {
    this.function()

    /*let username=localStorage.getItem("username")
    this.us.getProductsFromCart(username).subscribe(
      res=>{
        if(res['message']==="User cart is empty"){this.cartStatus=false}
        else{this.cartStatus=true;this.products=res}
      }
      ,err=>{
      console.log("Error in reading cart products",err)
      alert("Something went wrong")
    })*/
  }

  onDelete(product,ind)
  {
    let un=localStorage.getItem("username")
    this.us.deleteProductFromUserCart(un,ind).subscribe(
      res=>{
        this.function()
        this.products=res.products
        alert(res.message)
        this.us.updateDataObservable(res.latestUserObj.products)
      },
      err=>{
        console.log("Error in deletion cart product",err)
        alert("Something went wrong")
      }
    )
  }

}
