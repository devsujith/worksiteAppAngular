import { Injectable, Inject } from '@angular/core';

import { Router } from '@angular/router';
import { ProjectObject, TaskObject } from './response.model';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
 



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private isloggedIn: boolean;
  public userID: string;
  public userName: string;
  public selectedProject: ProjectObject
  public selectedTask: TaskObject

  constructor(private router:Router,@Inject(SESSION_STORAGE) private storage: StorageService) { 
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

}
