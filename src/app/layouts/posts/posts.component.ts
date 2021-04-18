import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private httpy:HttpClient,private fb:FormBuilder,
    private httpservice:HttpService,
    
    ) { }
  formData=new FormData()
  dbdata:any
  image:any
  user_id:any
  caption_id:any
  caption:any
  post!:FormGroup;
  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.onSubmit()
    this.post=this.fb.group({
       user_id:[''],
      caption:['']
    })
    
  }
  onSubmit(){
    this.httpy.get('http://localhost:9000/joinData').subscribe((data:any)=> {
      console.log(data);
  this.dbdata=data.data
   } )
  }
  onDelete(index:any){
    this.httpy.delete('http://localhost:9000/postDelete/'+index).subscribe((data:any) =>{
      console.log(data);   
      alert('deleted')
  })
  }
  onEditCaption(data:any,id:any){
this.caption=data.caption
this.caption_id=id
console.log(this.caption)
console.log(this.caption_id)
  }
  onCopy(){
    this.httpy.put('http://localhost:9000/postUpdate/'+this.caption_id,{caption:this.caption}).subscribe((data:any) =>{
      console.log(data);   
      alert('Updated')
      location.reload()
  })
  // this.httpservice.putData(ApiUrl.apiUrl.post_update+index,{caption:this.caption})
  }
  onPost(){
    // console.log(this.post.controls.caption.value)
    // console.log(this.post.controls.user_id.value)
    // console.log(this.post.controls.image.value)
    // console.log(this.post.get('image'))
    var user_id=this.post.controls.user_id.value
    var caption=this.post.controls.caption.value
    this.formData.append('user_id',user_id)
    this.formData.append('image',this.image)

// this.formData.append('caption',caption)
const httpOptions={
  headers:new HttpHeaders({
  // 'user_id':user_id,
  'caption':caption
  })
}

this.httpy.post('http://localhost:9000/postData',this.formData,httpOptions).subscribe((data:any)=> {
  console.log(data);
// this.dbdata=data.data
alert("upload sucess")
},
err=>{
  alert("not uploaded")
  console.log(err.message)
} )
  }
  onFileUpload(event:any){
    if(event.target.files.length>0){
      const file=event.target.files[0]
      this.image=file
    }
  }

}
