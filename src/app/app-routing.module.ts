import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component'
import { ProjectsComponent } from './projects/projects.component'
import { EmployeesComponent } from './employees/employees.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { NeedAuthGuardService } from './need-auth-guard.service';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'projects', component: ProjectsComponent,canActivate: [NeedAuthGuardService]},
  { path: 'employees', component: EmployeesComponent,canActivate: [NeedAuthGuardService]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [NeedAuthGuardService]},
  { path: 'projects/:id', component: ProjectDetailComponent, canActivate: [NeedAuthGuardService]},
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [NeedAuthGuardService]},
  { path: 'login', component: LandingPageComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
