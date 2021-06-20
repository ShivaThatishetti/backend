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
  onLogin()
  {
    console.log(this.user)
    this.us.loginUser(this.user).subscribe(res=>{
      if(res.message==="Login success"){
        //update user status
        this.us.userLoginStatus=true
        //save token to localstorage
        localStorage.setItem("token",res.token)
        localStorage.setItem("username",res.username)
        localStorage.setItem("userObj",JSON.stringify(res.userObj))
        //navigate to user profile
        this.router.navigateByUrl(`userProfile/${res.username}`)
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

}
