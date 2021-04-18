import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module';
import { StudentsComponent } from './students/students.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    LayoutsComponent,
    DashboardComponent,
    StudentsComponent,
    AddEditUserComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LayoutsModule { }
