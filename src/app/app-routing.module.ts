import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsercartComponent } from './usercart/usercart.component';
import { UsersComponent } from './users/users.component';
import { ViewProductsComponent } from './view-products/view-products.component';

const routes: Routes = [{path:"home",component:HomeComponent},
{path:"register",component:RegisterComponent},
{path:"login",component:LoginComponent},
{path:'Users',component:UsersComponent},
{path:"contactus",component:ContactusComponent},
{path:"userProfile/:username",component:UserProfileComponent,
children:[
  {path:"viewProducts",component:ViewProductsComponent},
  {path:"viewCart",component:UsercartComponent}]},
{path:"",redirectTo:'login',pathMatch:"full"},
{path:"admin",loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
{path:"**",component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
