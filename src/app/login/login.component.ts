import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {//(3rd execute)
  //class- collection of properties and functions
  //proprties/variables

  aim="Your perfect banking partner";

  account="enter your account here";
  acno='';
  pswd='';
   // loginForm model
   loginForm =this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  
  

  

  
  //functions/methods-user defined functions(4th execute)
  // dependency injection

  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { //(1st execute)
  //It automatically invokes when the object is created
  // object initialization
}

  ngOnInit(): void {//(2nd execute)
    //It's a life cycle hooks of angular
    //when the component is created at same time it will initialize or authorized
    
  }
  login(){
    //alert('Login clicked');
    var acno=this.loginForm.value.acno;
    var pswd=this.loginForm.value.pswd;
    // var userDetails=this.ds.userDetails;
  
    if(this.loginForm.valid){
      var acno=this.loginForm.value.acno;
    var pswd=this.loginForm.value.pswd;
    
      this.ds.login(acno,pswd)
      .subscribe((result:any)=>{
        localStorage.setItem('currentUser',JSON.stringify(result.currentUser));
        localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno));
        localStorage.setItem('token',JSON.stringify(result.token));
       
        alert(result.message);
      this.router.navigateByUrl('dashboard')
    },
        result=>{
      alert(result.error.message)
    }
      )
  }
    
  }
}




// function subscribe(arg0: (result: any) => void, arg1: (result: { error: { message: any; }; }) => void) {
//   throw new Error('Function not implemented.');
// }
// acnoChange(event:any){
//   console.log(event);
//   this.acno=event.target.value;
//   console.log(this.acno);
// pswdChange(event:any){
//   this.pswd=event.target.value;
//   console.log(this.pswd);
  





// login(a:any,p:any){
//   //alert('Login clicked');
//   var acno=a.value;
//   var pswd=p.value;
//   var userDetails=this.userDetails;
//   if(acno in userDetails){
//     if(pswd==userDetails[acno]['password']){
//       alert('Login successful');
//     }
//     else{
//       alert('Invalid password');
//     }
//   }
//   else{
//     alert('Invalid user details');
//   }

// }
// acnoChange(event:any){
// console.log(event);
// this.acno=event.target.value;
// console.log(this.acno);
// }
// pswdChange(event:any){
// this.pswd=event.target.value;
// console.log(this.pswd);

// }

// }
