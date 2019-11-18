import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private customer : CustomerService) { }

  ngOnInit() {
  }

  logout(){

    this.customer.logoutUser()
   

  }

}
