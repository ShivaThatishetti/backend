import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  constructor(private as:AdminService,private us:UserService) { }
products=[]
currentuser
function()
{
  this.currentuser=localStorage.getItem("username")
    this.as.getProducts().subscribe(
      res=>{
        this.products=res
      },
      err=>{
        console.log("error in reading products",err)
        alert("something went wrong in reading products")
      })
}
  ngOnInit(): void
  {
    this.function()
  }
  onProductSelected(product)
  {
    let username=localStorage.getItem("username")
    let newProObj={username,product}
    this.us.sendProductToUserCart(newProObj).subscribe(
      res=>
      {
        alert(res['message'])
       this.us.updateDataObservable(res.latestCartObj)
      },
      err=>{console.log("Error in adding to cart",err)
    alert("Something went wrong")})
  }
  onDelete(product)
  {
    this.as.deleteProductFromDatabase(product.productname).subscribe(
      res=>{alert(res["message"]);this.function()},
      err=>{console.log("error in deletion",err)})
  }

}
