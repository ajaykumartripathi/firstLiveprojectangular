
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../utils/guards/auth.guard';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutsComponent } from './layouts.component';
import { PostsComponent } from './posts/posts.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '', component:LayoutsComponent,canActivate:[AuthGuard], children:[
      {path:'dashboard', component:DashboardComponent},
      {path:'students', component:StudentsComponent},

    ] },
    {path:'add-edit',component:AddEditUserComponent},
    {path:'post',component:PostsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
