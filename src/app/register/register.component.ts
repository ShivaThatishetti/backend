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
  onSubmit()
  {
    console.log(this.reg)
    this.us.createUser(this.reg).subscribe(res=>{
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
