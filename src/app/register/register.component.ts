import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  uname="";
  acno="";
  pswd="";
  constructor(private fb:FormBuilder , private ds:DataService,private router:Router) { }
  //registration model
  registerForm =this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],//array
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  //control pass to ts to html file 
  ngOnInit(): void {
  }
  register(){
    // alert('register clicked');
    console.log(this.registerForm);
    
    
    var username=this.registerForm.value.uname;
    var acno=this.registerForm.value.acno;
    var pswd=this.registerForm.value.pswd;
    
    if(this.registerForm.valid){
      // console.log(this.registerForm.get('uname')?.errors);//valid or not
      this.ds.register(acno,username,pswd)
    
    .subscribe((result:any)=>{
      alert(result.message);
      this.router.navigateByUrl('')
    },
    result=>{
      alert(result.error.message)
    }
    ) 
  }

    
  // const result=this.ds.register(acno,uname,pswd);
   
  //   if(result){
  //     alert('Register successful')
  //     this.router.navigateByUrl('')
  //   }
  //   else{
  //     alert('User already registered');
  //     this.router.navigateByUrl('register')
  //   }
  // }
 
}
}


