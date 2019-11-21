import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonResponse, EmployeeObject } from '../response.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private modalService : NgbModal, private apiService : ApiService, private customer : CustomerService) { }

  selectedEmployee : EmployeeObject
  ngOnInit() {
    this.customer.getEmployees()
  }

  showAddEmployee(content){
    console.log('edit')
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  createEmployee(data:NgForm){

    console.log(data.value)
    
    var params = {
      name : data.value.name,
      code : data.value.code,
      type : data.value.type,
      userID : this.customer.userID

    }

    console.log(params)

    this.apiService.apiAddEmployee(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      if (data.success)
      {
      
        this.modalService.dismissAll()
        this.customer.getEmployees()

      } 
      else
      {
        window.alert(data.message)
       console.log(data.message) 
      }
      
     
    })
  }

  showEditEmployee(content,data){
    console.log('edit')
    this.selectedEmployee = data as EmployeeObject
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  showDeleteEmployee(content,data){
    console.log('delete')
    this.selectedEmployee = data as EmployeeObject
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }


  updateEmployee(data){

    console.log(data.value)
    
    var params = {
      name : data.value.name,
      code : data.value.code,
      type : data.value.type,
      userID : this.customer.userID,
      employeeID : this.selectedEmployee._id
    }

    console.log(params)

    this.apiService.apiUpdateEmployee(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      if (data.success)
      {
      
        this.modalService.dismissAll()
        this.selectedEmployee.name = params.name
        this.selectedEmployee.code = params.code
        this.selectedEmployee.type = params.type

      } 
      else
      {
        window.alert(data.message) 
       console.log(data.message) 
      }
      
     
    })
   

  }

  deleteEmployee(){


    
    var params = {
     
     
      userID : this.customer.userID,
      employeeID : this.selectedEmployee._id

    }

    console.log(params)

    this.apiService.apiDeleteEmployee(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      if (data.success)
      {
      
        this.modalService.dismissAll()
        this.customer.getEmployees()

      } 
      else
      {
        window.alert(data.message)
       console.log(data.message) 
      }
      
     
    })

  }

}
