import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 baseurl = "https://sujith-worksite-backend.herokuapp.com/"
//baseurl = "http://localhost:3000/"
  constructor(private http:HttpClient, private router: Router) { }


  apiLogin(data){
    return this.http.post( this.baseurl + "auth/login",data);
  }

  apiSignup(data){
    return this.http.post( this.baseurl + "auth/signup",data)
  }

  apiCreateProject(data){

    
    return this.http.post( this.baseurl + "project/createProject",data)
  }

  apiUpdateProject(data){
    return this.http.post( this.baseurl + "project/updateProject",data)
  }

  apiDeleteProject(data){
    return this.http.post( this.baseurl + "project/deleteProject",data)
  }
  
  apiGetProject(data){
    return this.http.post( this.baseurl + "project/getProject",data)
  }
  

  apiGetProjects(data){
    return this.http.post( this.baseurl + "project/getProjects",data)
  }

  apiAddTask(data){
    return this.http.post( this.baseurl + "project/addTask",data)
  }

  apiUpdateTask(data){
    return this.http.post( this.baseurl + "project/updateTask",data)
  }

  apiDeleteTask(data){
    return this.http.post( this.baseurl + "project/deleteTask",data)
  }

  apiAddWage(data){
    return this.http.post( this.baseurl + "project/addWage",data)
  }

  apiAddExpense(data){
    return this.http.post( this.baseurl + "project/addExpense",data)
  }

  apiUpdateExpense(data){
    return this.http.post( this.baseurl + "project/updateExpense",data)
  }

  apiDeleteExpense(data){
    return this.http.post( this.baseurl + "project/deleteExpense",data)
  }

  apiAddPayment(data){
    return this.http.post( this.baseurl + "project/addPayment",data)
  }

  apiUpdatePayment(data){
    return this.http.post( this.baseurl + "project/updatePayment",data)
  }

  apiDeletePayment(data){
    return this.http.post( this.baseurl + "project/deletePayment",data)
  }

  apiAddEmployee(data){
    return this.http.post( this.baseurl + "employee/addEmployee",data)
  }

  apiGetEmployees(data){
    return this.http.post( this.baseurl + "employee/getEmployees",data)
  }

  apiUpdateEmployee(data){
    return this.http.post( this.baseurl + "employee/updateEmployee",data)
  }

  apiDeleteEmployee(data){
    return this.http.post( this.baseurl + "employee/deleteEmployee",data)
  }




}
