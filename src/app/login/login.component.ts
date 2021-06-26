import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

interface login{
  username:string,
  password:string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private router:Router,private us:UserService){}
user:login={
  username:"",
password:""
}
  onLogin(user)
  {
    
    if(user.type==="admin")
    {
      this.us.loginAdmin(this.user).subscribe(
        res=>{
          if(res.message==="Login success")
          {
            this.us.userLoginStatus=true
           //save token to localstorage
           localStorage.setItem("username",res.username)
           localStorage.setItem("userObj",JSON.stringify(res.userObj))
           //this.router.navigateByUrl(`admin/${res.username}`)
           this.router.navigateByUrl("admin/viewProducts")
          }
          else{alert(res.message)}
        },
        err=>{console.log(err);alert("Something went wrong in admin login")})
    }
    else if(user.type==="user")
    {
      this.us.loginUser(this.user).subscribe(res=>{
        if(res.message==="Login success"){
          //update user status
          this.us.userLoginStatus=true
          //save token to localstorage
          localStorage.setItem("token",res.token)
          localStorage.setItem("username",res.username)
          localStorage.setItem("userObj",JSON.stringify(res.userObj))
          //navigate to user profile
          this.router.navigateByUrl(`userProfile/${res.username}/viewProducts`)
        }
        else{
          alert(res.message)
        }
      },
      err=>{
        console.log(err)
        alert("Something went wrong in login")
      })
    }
    else{alert("Please choose Type of Client")}
  }

}
