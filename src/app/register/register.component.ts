import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

interface register
{
  username:any
  password:any
  DOB:any
  contact:any
  gmail:any
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  constructor(private us:UserService,private router:Router) { }
reg:register={
  username:"",
  password:"",
  DOB:"",
  contact:"",
  gmail:""
}
  ngOnInit(): void {
  }
  file:File
  image:any
  imageUrl:string | ArrayBuffer
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
    console.log(this.reg)
    let formDataObj=new FormData()
    //add file
    formDataObj.append("image",this.file,this.file.name)
    //add userObj
    formDataObj.append("userObj",JSON.stringify(this.reg))

    this.us.createUser(formDataObj).subscribe(res=>{
      if(res.message==="user successfully created ")
      {
        alert("User created Successfully")
        this.router.navigateByUrl("/register")
      }
      else
      {
        alert(res.message)
      }
    },err=>{
      console.log(err)
      alert("Something went wrong in login")
    })
  }


}
