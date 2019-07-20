import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { EmployeeService } from '../shared/employee.service';
import { DepartmentService } from '../shared/department.service';
import { NotificationService } from '../shared/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(
    private service: EmployeeService ,
    private departmentService: DepartmentService ,
    private notificationService: NotificationService ,
    public dialogRef: MatDialogRef<OrderDetailComponent>
  ) { }

    element : any;

  ngOnInit() {
    this.element = JSON.parse(this.service.Getdata());
    //console.log("element is",this.element);
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onClose() {
    this.dialogRef.close();
  }
}
