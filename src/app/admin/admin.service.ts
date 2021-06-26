import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public hc:HttpClient) { }
  addProduct(product):Observable<any>
  {
    return this.hc.post("/products/addProduct",product)
  }
  getProducts():Observable<any>
  {
    return this.hc.get("/products/getproducts")
  }
  deleteProductFromDatabase(product):Observable<any>
  {
    return this.hc.delete(`/products/deleteproducts/${product}`)
  }
}
