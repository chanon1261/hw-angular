import { Component } from '@angular/core';
import templateString from './secondid.html';
import { MyDataService } from '../my_data/my_data.service';
import { MyData } from '../my_data/my_data';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  template: templateString,
  providers: [ MyDataService ]
})
export class SecondIdComponent {
  private myDatas: any;
  private attrs: any
  private newMyData: MyData;
  private createLabel;
  private oneData: any;
  private id;



  constructor(private myDataService: MyDataService,private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(this.activatedRoute.snapshot.params['id']);
      console.log("test param")
      this.id = this.activatedRoute.snapshot.params['id'];
    });
  }

  ngOnInit() {
    this.getAll();
    this.newMyData = new MyData();
    this.createLabel = "Create";
    
  }

  getAll() {
    this.myDataService.all().subscribe(resp => {
      // console.log(resp);
      this.myDatas = resp;
    }, e => {
      console.log(e);
    })
    // console.log(this.myDatas(6))
  }

 

  update(id, string_test, integer_test, boolean_test) {
    this.attrs = {
      string_test: string_test,
      integer_test: integer_test,
      boolean_test: boolean_test
    }
    this.myDataService.update(id, this.attrs).subscribe(resp => {
      console.log(resp);
      this.myDatas = resp;
    }, e => {
      console.log(e);
    })
  }

  create(newMyData) {
    console.log(newMyData.getCreateParam())
    this.myDataService.create(newMyData.getCreateParam()).subscribe(resp => {
      console.log(resp);
      this.myDatas = resp;
      this.newMyData = new MyData();
    }, e => {
      console.log(e);
    })
  }

 }
