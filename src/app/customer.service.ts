import { Injectable, Inject } from '@angular/core';

import { Router } from '@angular/router';
import { ProjectObject, TaskObject, CommonResponse, EmployeeObject } from './response.model';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { ApiService } from './api.service';
 



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private isloggedIn: boolean;
  public userID: string;
  public userName: string;
  public allProjects: ProjectObject[] = []
  public allEmployees: EmployeeObject[] = []
  public selectedProject: ProjectObject
  public selectedTask: TaskObject

  constructor( private apiService : ApiService, private router:Router,@Inject(SESSION_STORAGE) private storage: StorageService) { 
    this.isloggedIn=this.isUserLoggedIn();
    this.userID = this.storage.get('userID');
    this.userName = this.storage.get('userName');

    //this.userID = "5dd278dc68f32005fcceaf47"
  }


  // isLogged() {
  //   return localStorage.getItem(TOKEN) != null;
  // }

  setLogin(userID : string, name : string) {
 
    //Assuming users are provided the correct credentials.
    //In real app you will query the database to verify.
    console.log('login saved')
    this.isloggedIn=true;
    this.userID = userID;
    this.userName = name;

    this.storage.set('isLoggedIn', "true");
    this.storage.set('userID', userID);
    this.storage.set('userName', name);
    
   
}

  isUserLoggedIn(): boolean {
    let status = false;
        if( this.storage.get('isLoggedIn') == "true"){
          status = true;
        }
        else{
          status = false;
        }
        return status;
  }

  logoutUser(): void{
    console.log("logout called")
    this.isloggedIn = false;
    this.userID = null;
    this.userName = null;
    this.storage.set('isLoggedIn', "false");
    this.storage.remove('userID');
    this.storage.remove('userName');
   
   this.router.navigate(['/']);
   
  }

  getProjects(){

    

    var params = {

      userID : this.userID

    }

    console.log(params)

    this.apiService.apiGetProjects(params).subscribe( (data: CommonResponse) =>{
      console.log(data);
      if (data.success)
      {
      
        
       // this.projectsData = data.data as [ProjectObject]
       // console.log(this.projectsData)
        this.allProjects = data.data as [ProjectObject]
       

      } 
      else
      {
        
       console.log(data.message) 
      }
      
     
    })

  }


  getEmployees(){

    

    var params = {

      userID : this.userID

    }

    console.log(params)

    this.apiService.apiGetEmployees(params).subscribe( (data: CommonResponse) =>{
      console.log(data.data);
      if (data.success)
      {
      
        
       // this.projectsData = data.data as [ProjectObject]
       // console.log(this.projectsData)
        this.allEmployees = data.data as EmployeeObject[]
        console.log(this.allEmployees)
       

      } 
      else
      {
        
       console.log(data.message) 
      }
      
     
    })

  }
}
