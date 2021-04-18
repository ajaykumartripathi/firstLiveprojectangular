import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constant } from 'src/app/utils/constant';
import {ApiUrl} from '../../utils/api'
import {HttpService} from '../../services/http.service'
import {AdminService} from '../../services/admin.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  submitted:boolean= false;
  constructor(private fb:FormBuilder,private httpservice:HttpService,
    private adminservice:AdminService,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.login=this.fb.group({
      email:['',[Validators.required,Validators.email,Validators.pattern(Constant.EMAIL)]],
      password:['',[Validators.required,Validators.pattern(Constant.PASSWORD)]],
      })
  }
onSubmit(){
this.submitted=true
if(!this.login.invalid){
  // console.log(this.login.value);
  this.httpservice.postData(ApiUrl.apiUrl.login, this.login.value).subscribe((res:any) => {
    console.log(res);
    console.log(res.token);
    //alert(res.message);
    // this.spinner.show();
    this.adminservice.showSuccess(res.message)
  // console.log(res.data)
  localStorage.setItem('usersdata',JSON.stringify(res))
  localStorage.setItem('accesstoken',JSON.stringify(res.token))
    this.router.navigateByUrl('/dashboard');
    this.adminservice.setData(res.data[0])
  },err => {
    console.log(err);
    //alert(err.error.message);
    this.toastr.success(err.error.message)
  });
}

}
}
