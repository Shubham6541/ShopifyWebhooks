import { Component, OnInit, ViewChild } from '@angular/core';
import {  CustomerService } from '../../shared/customer.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationService } from '../../shared/notification.service';
import { DialogService } from '../../shared/dialog.service';
import { OrderDetailComponent } from '../../order-detail/order-detail.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'
import { CustomerUpdateComponent } from '../customer-update/customer-update.component';
import { viewAttached } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private service: CustomerService ,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['order_number','fullName', 'email', 'mobile', 'city', 'amount', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  posts :any =[];

  ngOnInit() {

    this.service.getOrderlist().subscribe((res : any[])=>{
      this.posts = res;
      this.listData = new MatTableDataSource(res);
      console.log("new post is",res);


      console.log("listdata",this.listData);
      console.log("i am here");
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        /*this.listData.filterPredicate = (data, filter) => {
          console.log("listdata",this.listData);
          return this.displayedColumns.some(ele => {
            console.log("ele is ",data[ele]);
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };*/
  });
  }


  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    console.log(this.searchKey);
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  applyFilter1(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
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
    dialogConfig.maxWidth = "280vw" ;
    var width = window.innerWidth;
    console.log("width is",width);
    if (width > 950){
      console.log("widh1");
    dialogConfig.width = "40%";
    }
    else if (width > 750){
      console.log("widh1");
    dialogConfig.width = "55%";
    }
    else if (width > 500){
      dialogConfig.width = "90%";
    }
    else{
      console.log("wiffy");
      dialogConfig.width = "100%";
      console.log(dialogConfig);
    }

    this.dialog.open(CustomerUpdateComponent,dialogConfig);
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
    dialogConfig.maxWidth = "280vw" ;
    var width = window.innerWidth;
    console.log("width is",width);
    if (width > 950){
      console.log("widh1");
    dialogConfig.width = "55%";
    }
    else if (width > 850){
      console.log("widh1");
    dialogConfig.width = "75%";
    }
    else if (width > 500){
      dialogConfig.width = "90%";
    }
    else{
      console.log("wiffy");
      dialogConfig.width = "100%";
      console.log(dialogConfig);
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
