import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { AdminService } from '../admin.service';


interface product
{
  productname:any
  cost:any
  EngineCapacity:any
  Mileage:any
  KerbWeight:any
}

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(private router:Router,private as:AdminService) { }
  pro:product=
  {
    productname:"",
    cost:"",
    EngineCapacity:"",
    Mileage:"",
    KerbWeight:""
  }
  file:File
  image:any
  imageUrl:string |ArrayBuffer
  ngOnInit(): void {}
  
  selectFile(event)
  {
    this.file=event.target.files[0]
    
/* FileReader  object lets web applicants asynchronously read the contents of files
stored on the user's computer, using File or Blob objects to specify the file or data to read */
    const reader=new FileReader()
    //read the content of the specified content of the File or Blob
    reader.readAsDataURL(this.file)
    /* load event is triggered each time the reading operation is successfully completed */
    reader.onload=()=>{
      this.imageUrl=reader.result
    }

  }
  
  onSubmit()
  {
    let formDataObj=new FormData()
    //add file
    formDataObj.append("image",this.file,this.file.name)
    //add userObj
    formDataObj.append("proObj",JSON.stringify(this.pro))

    this.as.addProduct(formDataObj).subscribe(
      res=>{
      if(res.message==="Product successfully created ")
      {
        alert("Product created Successfully")
        this.router.navigateByUrl("/admin/addProducts")
      }
      else
      {
        alert(res.message)
      }
    }
    ,err=>{
      console.log(err)
      alert("Something went wrong in Product creation")
    })
  }

}
