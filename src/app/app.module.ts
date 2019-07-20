import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from "./material/material.module";
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { DepartmentService } from './shared/department.service';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CustomerUpdateComponent } from './customer/customer-update/customer-update.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerService } from './shared/customer.service';

@NgModule({
  declarations: [
    AppComponent,
    MatConfirmDialogComponent,
    OrderDetailComponent,
    CustomerComponent,
    CustomerUpdateComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    AppRoutingModule,

    FlashMessagesModule.forRoot(),

  ],
  providers: [CustomerService ,DepartmentService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[CustomerUpdateComponent,OrderDetailComponent,MatConfirmDialogComponent]
})
export class AppModule { }
