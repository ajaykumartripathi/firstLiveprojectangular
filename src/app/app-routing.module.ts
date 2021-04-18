import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './external/login/login.component';
import { SignupComponent } from './external/signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExternalGuard } from './utils/guards/external.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login',component:LoginComponent,canActivate:[ExternalGuard]},
  // {
  //   path:'signup',component:SignupComponent
  // },
  { path: '', loadChildren:()=>import('./layouts/layouts.module').then(m=>m.LayoutsModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
