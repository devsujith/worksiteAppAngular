import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonResponse, ProjectObject } from '../response.model';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

 // projectsData : ProjectObject[];

  constructor(private spinner: NgxSpinnerService,private router : Router, private apiService : ApiService, private modalService : NgbModal, private customer : CustomerService) { }

  ngOnInit() {
    
    this.customer.getProjects()
  }



  showAddProject(content){
    console.log('test')
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }


  

  createProject(data:NgForm){

    this.spinner.show()
    console.log(data.value)
    
    var params = {
      title : data.value.title,
      desc : data.value.desc,
      location : data.value.location,
      userID : this.customer.userID

    }

    console.log(params)

    this.apiService.apiCreateProject(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      this.spinner.hide()
      if (data.success)
      {
      
        this.modalService.dismissAll()
        //this.getProjects()
        this.customer.getProjects()

      } 
      else
      {
        window.alert(data.message)
       console.log(data.message) 
      }
      
     
    })
   
  }


  showDetail(id){
    console.log(id)
    this.customer.selectedProject = this.customer.allProjects.find(obj =>{
return obj._id == id;
    })
    this.router.navigate(['/projects/' + id]);

  }

  // getProjects(){

  //   var params = {

  //     userID : this.customer.userID

  //   }

  //   console.log(params)

  //   this.apiService.apiGetProjects(params).subscribe( (data: CommonResponse) =>{
  //     console.log(data);
  //     if (data.success)
  //     {
      
        
  //       this.projectsData = data.data as [ProjectObject]
  //       console.log(this.projectsData)
  //       this.customer.allProjects = this.projectsData
       

  //     } 
  //     else
  //     {
        
  //      console.log(data.message) 
  //     }
      
     
  //   })

  // }

}
