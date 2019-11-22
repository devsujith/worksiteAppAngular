import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,private customer : CustomerService) { }

  ngOnInit() {


   
    this.customer.getProjects()
    this.customer.getEmployees()
  }


}
