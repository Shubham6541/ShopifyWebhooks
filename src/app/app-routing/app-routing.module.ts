import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from '../customer/customer-list/customer-list.component';


const routes: Routes = [
  { path: '', component: CustomerListComponent },
  ];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
