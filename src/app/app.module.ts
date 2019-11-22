import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavbarComponent } from './navbar/navbar.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';

import { EmployeesComponent } from './employees/employees.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    DashboardComponent,
    ProjectsComponent,
    EmployeesComponent,
    SidebarComponent,
    HomeComponent,
    ProjectDetailComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    StorageServiceModule,
    ReactiveFormsModule,
    NgxSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent,NavbarComponent]
})
export class AppModule { }
