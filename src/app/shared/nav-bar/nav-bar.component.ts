import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
userdata!:any
localdata!:any
imgd!:any
  constructor(private adminservice:AdminService) { }

  ngOnInit(): void {
    this.userdata=localStorage.getItem('usersdata')
this.localdata=JSON.parse(this.userdata)
console.log(this.localdata)
this.imgd=localStorage.getItem('image')
  }
  onLogout(){
    localStorage.removeItem('usersdata')
    localStorage.removeItem('accesstoken')
  localStorage.removeItem('image')
  location.reload()
  
  
  }
}
