import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Constant } from 'src/app/utils/constant';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
signup!:FormGroup
submitted:boolean=false
paramsSubscription:any
showpassword:boolean=false
showconfirmpassword:boolean=false
usertype:string=''
id:any
  constructor(private fb:FormBuilder,private router: Router,
    private route: ActivatedRoute, private httpclient:HttpClient,private adminservice:AdminService) {  }

  ngOnInit(): void {
    this.initForm()
  this.getFormData()
  
  }
  onSubmit(){
    console.log("add working")
this.submitted=true
console.log(typeof this.signup)
console.log("onsubmit",this.id)
if(this.signup.valid){
  if(this.id){
    
    this.httpclient.put('http://localhost:9000/update/'+this.id,this.signup.value).subscribe((data:any)=>{
    console.log("update data",data)
    this.adminservice.showSuccess("Data Update")
    this.router.navigateByUrl("/students")
    },
    )
  }else
  {
    this.httpclient.post('http://localhost:9000/register',this.signup.value).subscribe((res:any) => {
      this.adminservice.showSuccess("Data inserted")
  this.router.navigateByUrl("/students")
    })
  }
}

  }

  getFormData(){
    this.paramsSubscription = this.route.queryParams.subscribe(params=>{
      console.log("param id",params.id)
      console.log("showpassword",typeof params.showpassword)
      this.usertype=params.title
      this.showpassword=params.showpassword
      this.showconfirmpassword=params.showpassword
      if (params.id) {
        this.signup.removeControl('password');
        this.signup.removeControl('confirmPassword');
        this.id = params.id;
        this.httpclient.get('http://localhost:9000/showOne/'+this.id).subscribe((res:any) => {
        console.log("response",res)
        // console.log(res.data.data.firstname)
        if (res.status == 200 ) {
          // this.signup.removeControl('password');
          // this.signup.removeControl('confirmPassword');
             console.log("after remove",this.signup)
             this.signup.patchValue({
                firstname: res.data[0].first_name,
                lastname: res.data[0].last_name,
                email: res.data[0].email,
                phone: res.data[0].phone_number,

                // countryCode: res.data.countryCode,
                // mobileNo: res.data.mobileNo,
              });
            }
        });
      
      }
    });
  }

initForm(){
  this.signup=this.fb.group({
    firstname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(10),Validators.pattern('[a-zA-Z ]*')]],
    lastname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern('[a-zA-Z ]*')]],
    email:['',[Validators.required,Validators.email,Validators.pattern(Constant.EMAIL)]],
    phone:['', [Validators.required]],
    password:['',[Validators.required,Validators.pattern(Constant.PASSWORD)]],
    confirmPassword:['',[Validators.required]]},
    {validator: ConfirmedValidator('password', 'confirmPassword')
    }
    )
    
    function ConfirmedValidator(controlName: string, matchingControlName: string){
      return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
         if((!control) && (!matchingControl))
         {
           return;
         }
          if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
              return;
          }
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ confirmedValidator: true });
          } else {
              matchingControl.setErrors(null);
          }
      }
}
}
}
