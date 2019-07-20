import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
//import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { element } from '@angular/core/src/render3/instructions';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private postsUpdated = new Subject<any>();
  posts : any = [];
  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe,
    private http: HttpClient,



    ) { }



  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    email: new FormControl('', Validators.email),
    mobile: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: '',
      email: '',
      mobile: '',
    });
  }


  getOrderlist(){
   this.posts = this.http.get('http://localhost:3000/order/list');
   return this.posts;
  }



  updateOrder(element){


    console.log("updateorder",element);
    this.http.post("http://localhost:3000/order/update",element)
    .subscribe(() => {
      //const updatedPosts = this.posts.filter(post => post.id !== postId);
      //this.posts = updatedPosts;
      //this.postsUpdated.next([...this.posts]);
    });
    console.log(element);

  }

  deleteOrder(element_id){
    this.http.delete("http://localhost:3000/order/delete/"+element_id).subscribe(()=>{

    });
    console.log("final delete",element_id);
  }


  populateForm(element) {
    console.log("populate",element);
    this.form.setValue({
      id: element.id,
      email: element.email||" ",
      mobile:element.customer.default_address.phone || "  ",
    });
  }

  Storedata(element){
    localStorage.clear();
    localStorage.setItem('element',JSON.stringify(element));

  }
  Getdata(){
    const data = localStorage.getItem('element');
    return data;
  }
}
