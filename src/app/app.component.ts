import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'backend-Angular';
  constructor(public us:UserService,public router:Router){}  
  userLogout()
   {
     localStorage.clear()
     this.us.userLoginStatus=false
     this.router.navigateByUrl('login')
    }
}
