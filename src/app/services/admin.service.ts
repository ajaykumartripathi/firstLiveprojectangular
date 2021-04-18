import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private toastr: ToastrService) { }
  user:BehaviorSubject<any> = new BehaviorSubject(null);  
  setData(value:any) {
    this.user.next(value); 
    localStorage.setItem('usersdata',JSON.stringify(value))
    localStorage.setItem('image',value.profile_pic)
  }
  showSuccess(message:any){
    this.toastr.success(message)
}
  // setToken(tokenvalue:any){
  //   this.user.next(tokenvalue)
  // }
}
