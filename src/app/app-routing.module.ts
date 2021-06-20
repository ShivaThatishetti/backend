import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{path:"home",component:HomeComponent},
{path:"register",component:RegisterComponent},
{path:"login",component:LoginComponent},
{path:'Users',component:UsersComponent},
{path:"contactus",component:ContactusComponent},
{path:"userProfile/:username",component:UserProfileComponent},
{path:"",redirectTo:'/home',pathMatch:"full"},
{path:"**",component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
