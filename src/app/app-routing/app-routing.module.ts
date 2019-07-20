import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeListComponent } from '../employees/employee-list/employee-list.component';
import { EmployeeComponent } from '../employees/employee/employee.component';


const routes: Routes = [
  { path: '', component: EmployeeListComponent},
  {path: 'hrm', component: EmployeeComponent},];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
