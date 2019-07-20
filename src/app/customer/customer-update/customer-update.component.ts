import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { MatDialogRef } from '@angular/material';
import { DepartmentService } from '../../shared/department.service';
import { NotificationService } from '../../shared/notification.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  constructor(private service: CustomerService ,
    private departmentService: DepartmentService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CustomerUpdateComponent>,
    private router: Router) { }

    element : any;

  ngOnInit() {
    this.element = JSON.parse(this.service.Getdata());
  }


  onSubmit() {
    if (this.service.form.valid) {
      console.log(this.service.form.value);

      this.service.updateOrder(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
      this.router.navigate(['']);
      window.location.reload();

    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
