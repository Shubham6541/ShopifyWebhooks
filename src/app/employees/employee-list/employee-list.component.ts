import { EmployeeComponent } from './../employee/employee.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DepartmentService } from '../../shared/department.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationService } from '../../shared/notification.service';
import { DialogService } from '../../shared/dialog.service';
import { OrderDetailComponent } from '../../order-detail/order-detail.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService,
    private departmentService: DepartmentService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['order_number','fullName', 'email', 'mobile', 'city', 'departmentName','details', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  posts :any =[];

  ngOnInit() {

    this.service.getOrderlist().subscribe((res : any[])=>{
      this.posts = res;
      console.log("new post is",res);

      this.listData = new MatTableDataSource(res);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
  });
  }


  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }




  getUrl()
{
  return "url('https://images3.alphacoders.com/823/82317.jpg')";
}

  onEdit(element){
    if(element.customer.id != null){
    this.service.Storedata(element);
    this.service.populateForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "450px";

    this.dialog.open(EmployeeComponent,dialogConfig);
    }
    else{
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'No Customer Details for this Order',

      })
    }
  }

  onDelete(element_id){
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deleteOrder(element_id);
        console.log(element_id);
        this.notificationService.warn('! Deleted successfully');
        //this.router.navigate(['']);
      window.location.reload();
      }
    });
  }

  onMoreDetails(element){
    if(element.customer.id != null){
    this.service.Storedata(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    var width = window.innerWidth;
    if (width > 750){
    dialogConfig.width = "60%";
    }
    else if (width > 500){
      dialogConfig.width = "80%";
    }
    else{
      dialogConfig.width = "100%";
    }

    this.dialog.open(OrderDetailComponent , dialogConfig);
    }
    else{
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'No Customer Details for this Order',

      })
  }
}
}
