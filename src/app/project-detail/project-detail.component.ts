import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ProjectObject, CommonResponse, PaymentObject } from '../response.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  totalPayments : number = 0
  totalExpense : number = 0
selectedPayment : PaymentObject 
 @Input() project: ProjectObject
   taskData : []
  constructor(private spinner: NgxSpinnerService,private router : Router, private customer : CustomerService,private modalService : NgbModal,private apiService : ApiService) { }

  ngOnInit() {

    if (!this.customer.selectedProject){
      this.router.navigate(['/projects']);
    }
    this.project = this.customer.selectedProject
    this.getProject()
  }

  showEditProject(content){
    console.log('edit')
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  showDeleteProject(content){
    console.log('delete')
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  deleteProject(){

    console.log("delete")
    var params = {
      projectID : this.project._id,
      userID : this.customer.userID

    }
    this.apiService.apiDeleteProject(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      if (data.success)
      {
      
        this.modalService.dismissAll()
        this.router.navigate(['/projects']);

      } 
      else
      {
        window.alert(data.message)
       console.log(data.message) 
      }
      
     
    })
  }

  editProject(data:NgForm){
this.spinner.show()
    console.log(data.value)
    
    var params = {
      title : data.value.title,
      desc : data.value.desc,
      location : data.value.location,
      projectID : this.project._id,
      userID : this.customer.userID

    }

    console.log(params)

    this.apiService.apiUpdateProject(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      this.spinner.hide()
      if (data.success)
      {
      
        this.modalService.dismissAll()
        this.project = data.data as ProjectObject

      } 
      else
      {
        
       console.log(data.message) 
       window.alert(data.message)
      }
      
     
    })
   
  }

  getProject(){
    console.log("get project")
    this.spinner.show()
    var params = {
      projectID : this.project._id,
      userID : this.customer.userID

    }
    this.apiService.apiGetProject(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      this.spinner.hide()
      if (data.success)
      {
      
        this.project = data.data as ProjectObject
        this.customer.selectedProject = this.project
        console.log(this.project.tasks)

        this.updateTotalValues()

      } 
      else
      {
        window.alert(data.message)
       console.log(data.message) 
      }
      
     
    })
  }

  updateTotalValues(){

    this.totalPayments = 0
    this.totalExpense = 0
    for(var i = 0;i < this.project.payments.length;i++){
      this.totalPayments += this.project.payments[i].amount


    }

    for(var i = 0;i < this.project.tasks.length;i++){
      for(var j=0; j< this.project.tasks[i].expenses.length;j++){

        this.totalExpense +=  this.project.tasks[i].expenses[j].amount

      }

    }

    

    



  }

  showAddTask(content){
    console.log('test')
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  createTask(data:NgForm){

    this.spinner.show()
    console.log(data.value)
    
    var params = {
      taskName : data.value.taskName,
      startDate : data.value.startDate,
      endDate : data.value.endDate,
      estiamtedCost : data.value.estiamtedCost,
      userID : this.customer.userID,
      projectID : this.project._id,

    }

    console.log(params)

    this.apiService.apiAddTask(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      this.spinner.hide()
      if (data.success)
      {
      
        this.modalService.dismissAll()
        this.getProject()

      } 
      else
      {
        window.alert(data.message)
       console.log(data.message) 
      }
      
     
    })
  }

  showTaskDetail(id){
    console.log(id)
    this.customer.selectedTask = this.project.tasks.find(obj =>{
return obj._id == id;
    })
    console.log(this.customer.selectedTask )
    this.router.navigate(['/tasks/' + id]);

  }

  showAddPayment(content){
    console.log('test')
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  createPayment(data:NgForm){

    this.spinner.show()
    console.log(data.value)
    
    var params = {
      title : data.value.title,
      date : data.value.date,
      amount : data.value.amount,
      mode : data.value.mode,
      userID : this.customer.userID,
      projectID : this.project._id,

    }

    console.log(params)

    this.apiService.apiAddPayment(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      this.spinner.hide()
      if (data.success)
      {
      
        this.modalService.dismissAll()
        this.getProject()

      } 
      else
      {
        window.alert(data.message)
       console.log(data.message) 
      }
      
     
    })
  }

  showEditPayment(content,data){
    console.log('edit')
    console.log(data)
    this.selectedPayment = data as PaymentObject
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  showDeletePayment(content,data){
    console.log('delete')
    this.selectedPayment = data as PaymentObject
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  updatePayment(data){
    this.spinner.show()

    console.log(data.value)
    
    var params = {
      title : data.value.title,
      date : data.value.date,
      amount : data.value.amount,
      mode : data.value.mode,
      userID : this.customer.userID,
      projectID : this.project._id,
      paymentID : this.selectedPayment._id


    }

    console.log(params)

    this.apiService.apiUpdatePayment(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      this.spinner.hide()
      if (data.success)
      {
      
        this.modalService.dismissAll()
        this.selectedPayment.title = params.title
        this.selectedPayment.date = params.date
        this.selectedPayment.amount = params.amount
        this.selectedPayment.mode = params.mode

      } 
      else
      {
        window.alert(data.message) 
       console.log(data.message) 
      }
      
     
    })
   

  }

  deletePayment(){

this.spinner.show()
    
    var params = {
     
      projectID : this.project._id,
      userID : this.customer.userID,
      paymentID : this.selectedPayment._id

    }

    console.log(params)

    this.apiService.apiDeletePayment(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      this.spinner.hide()
      if (data.success)
      {
      
        this.modalService.dismissAll()
        this.getProject()

      } 
      else
      {
        window.alert(data.message)
       console.log(data.message) 
      }
      
     
    })

  }

}
