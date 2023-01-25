import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //deposite properties
  acno="";
  pswd="";
  amount="";
  //withdraw properties
  acno1="";
  pswd1="";
  amount1="";
  //current user properties
  user="";
  //current date and tim e
  sdate:any;
   //deposite model
   depositeForm =this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  //deposite model
  withdrawForm =this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) {
    
    if(localStorage.getItem('currentUser')){
      this.user=JSON.parse(localStorage.getItem('currentUser')||'');
    }
   
    this.sdate=new Date();
   }

  ngOnInit(): void {
    if(!localStorage.getItem('currentUser')){
      alert('please login first')
      this.router.navigateByUrl('')
    }
    // this.user=JSON.parse(localStorage.getItem('currentUser')||'');
    // console.log(this.user);
    
  } 

  deposite(){
    // alert('clicked')
    var acno=this.depositeForm.value.acno;
    var pswd=this.depositeForm.value.pswd;
    var amount=this.depositeForm.value.amount;
    if(this.depositeForm.valid){
   this.ds.deposite(acno,pswd,amount)
    .subscribe((result:any)=>{
      alert(result.message)
    },
    result=>{
      alert(result.error.message)
    }
    )
    // if(result){
    //   alert(`${amount} is credited....available balance is ${result}`)
    // }
  }
}
  withdraw(){
    // alert('clicked')
    var acno=this.withdrawForm.value.acno;
    var pswd=this.withdrawForm.value.pswd;
    var amount=this.withdrawForm.value.amount;
    if(this.withdrawForm.valid){
    this.ds.withdraw(acno,pswd,amount)
    .subscribe((result:any)=>{
      alert(result.message)
    },
    result=>{
      alert(result.error.message)
    }
    )

    }
  }
  logout(){
    // alert('clicked');
    // remove currentAcno and currentUser from localstorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAcno');
    localStorage.removeItem('token');
    this.router.navigateByUrl('');

    
  }
  delete(){
    // alert('clicked')
    this.acno=JSON.parse(localStorage.getItem('currentAcno')||'');
  }
  onCancel(){
    this.acno="";
  }
  onDelete(event:any){
    // alert(event)
    this.ds.deleteAcc(event)
    .subscribe((result:any)=>{
      alert(result.message)
      // this.router.navigateByUrl('');
      this.logout();
    },
    result=>{
      
      alert(result.error.message)
    }
    )
  }

}
