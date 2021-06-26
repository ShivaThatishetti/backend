import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ViewProductsComponent } from '../view-products/view-products.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
      children:
      [
        {path:"viewProducts",component:ViewProductsComponent},
        {path:"addProducts",component:AddProductsComponent}
      ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
