import { Component, OnInit, Input } from '@angular/core';
import { TaskObject, ProjectObject, CommonResponse, ExpenseObject } from '../response.model';
import { CustomerService } from '../customer.service';
import { ApiService } from '../api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input() taskData : TaskObject
project: ProjectObject
selectedExpense : ExpenseObject

  constructor(private spinner: NgxSpinnerService, private router : Router, private customer : CustomerService,private modalService : NgbModal,private apiService : ApiService) { }

  ngOnInit() {
    if (!this.customer.selectedTask){
      this.router.navigate(['/projects']);
    }
    this.taskData = this.customer.selectedTask
    this.project = this.customer.selectedProject
  }


  showEditTask(content){
    console.log('edit')
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  showDeleteTask(content){
    console.log('delete')
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

updateTask(data:NgForm){
  this.spinner.show()

  console.log(data.value)
    
  var params = {
    taskName : data.value.taskName,
    startDate : data.value.startDate,
    endDate : data.value.endDate,
    estiamtedCost : data.value.estiamtedCost,
    userID : this.customer.userID,
    projectID : this.project._id,
    taskID : this.taskData._id

  }

  console.log(params)

  this.apiService.apiUpdateTask(params).subscribe( (data: CommonResponse) =>{
    console.log(data);
    this.spinner.hide()
    if (data.success)
    {
    
      this.modalService.dismissAll()
      this.project = data.data as ProjectObject
      this.taskData.taskName = params.taskName
      this.taskData.startDate = params.startDate
      this.taskData.endDate = params.endDate
      this.taskData.estiamtedCost = params.estiamtedCost

    } 
    else
    {
      window.alert(data.message)
     console.log(data.message) 
    }
    
   
  })

}

  deleteTask(){
    console.log("delete")
    this.spinner.show()
    var params = {
      projectID : this.project._id,
      userID : this.customer.userID,
      taskID : this.taskData._id

    }
    this.apiService.apiDeleteTask(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      this.spinner.hide()
      if (data.success)
      {
      
        this.customer.selectedTask = null
        this.modalService.dismissAll()
        this.router.navigate(['/projects/' + this.project._id]);

      } 
      else
      {
        window.alert(data.message)
       console.log(data.message) 
      }
      
     
    })
  }



  showAddExpense(content){
    console.log('showAddExpense')
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  getProject(){
    this.spinner.show()
    console.log("get project")
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

      

        this.customer.selectedTask = this.project.tasks.find(obj =>{
          return obj._id == this.taskData._id;
              })
          this.taskData = this.customer.selectedTask    
          console.log(this.taskData)


      } 
      else
      {
        window.alert(data.message)
       console.log(data.message) 
      }
      
     
    })
  }


  createExpense(data:NgForm){
this.spinner.show()
    console.log(data.value)
    
    var params = {
      title : data.value.title,
      date : data.value.date,
      amount : data.value.amount,
      mode : data.value.mode,
      userID : this.customer.userID,
      projectID : this.project._id,
      taskID : this.taskData._id

    }

    console.log(params)

    this.apiService.apiAddExpense(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      this.spinner.hide()
      if (data.success)
      {
      
        this.modalService.dismissAll()
        this.getProject()
        

      } 
      else
      {
        
       console.log(data.message) 
      }
      
     
    })
  }

  showEditExpense(content,data){
    console.log('edit')
    console.log(data)
    this.selectedExpense = data as ExpenseObject
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  showDeleteExpense(content,data){
    console.log('delete')
    this.selectedExpense = data as ExpenseObject
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  updateExpense(data){

    this.spinner.show()
    console.log(data.value)
    
    var params = {
      title : data.value.title,
      date : data.value.date,
      amount : data.value.amount,
      mode : data.value.mode,
      userID : this.customer.userID,
      projectID : this.project._id,
      taskID : this.taskData._id,
      expenseID : this.selectedExpense._id


    }

    console.log(params)

    this.apiService.apiUpdateExpense(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      this.spinner.hide()
      if (data.success)
      {
      
        this.modalService.dismissAll()
        this.selectedExpense.title = params.title
        this.selectedExpense.date = params.date
        this.selectedExpense.amount = params.amount
        this.selectedExpense.mode = params.mode

      } 
      else
      { window.alert(data.message)
        
       console.log(data.message) 
      }
      
     
    })
   

  }

  deleteExpense(){

this.spinner.show()
    
    var params = {
     
      projectID : this.project._id,
      userID : this.customer.userID,
      taskID : this.taskData._id,
      expenseID : this.selectedExpense._id

    }

    console.log(params)

    this.apiService.apiDeleteExpense(params).subscribe( (data: CommonResponse) =>{
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
