import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { CommonResponse, UserObject } from '../response.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private customer : CustomerService ,private apiService :ApiService, private router : Router,private modalService : NgbModal) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });

  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
});
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  get l() { return this.loginForm.controls; }

  showRegister(content){
    console.log('Register')
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  showSignin(content){
    console.log('Register')
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  signUp(){

    this.submitted = true;

    console.log(this.registerForm.value)

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log("invlaid form")
     
        return;
    }
    
  

    this.apiService.apiSignup(this.registerForm.value).subscribe( (data: CommonResponse) =>{
      console.log(data);
      if (data.success)
      {
        var user = data.data as UserObject
        console.log(user)
        this.customer.setLogin(user._id,user.name)
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

  login(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log("invlaid form")
     
        return;
    }

    console.log(this.loginForm.value)
    this.apiService.apiLogin(this.loginForm.value).subscribe( (data: CommonResponse) =>{
      console.log(data);
      if (data.success)
      {
        var user = data.data as UserObject
        console.log(user)
        this.customer.setLogin(user._id,user.name)
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

}
