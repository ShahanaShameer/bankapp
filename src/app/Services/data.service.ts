import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
//global http header object
const options={
  headers:new HttpHeaders
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser: any;
  //current user
  //current account number
  currentAcno="";
  
  constructor(private http:HttpClient) { 
  //    this.getDetails();
  }
  //saveDetails - to save data to local storage
  saveDetails(){
    //DATABASE
    localStorage.setItem('DataBase',JSON.stringify(this.userDetails))
    //currentUser
    localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
    //currentAcno
    localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
  }

  // getDetails(){
  //   if(localStorage.getItem('DataBase')) 
  //   {
  //     this.userDetails=JSON.parse(localStorage.getItem('DataBase') || '');
  //   }  
  //   if(localStorage.getItem('currentUser')) 
  //   {
  //     this.currentUser=JSON.parse(localStorage.getItem('currentUser') || '');
  //   }  
  //   if(localStorage.getItem('currentAcno')) 
  //   {
  //     this.currentAcno=JSON.parse(localStorage.getItem('currentAcno') || '');
  //   }  
  // }
  //database
  userDetails:any={
    1000:{acno:1000,username:"Amal",password:1000,balance:1000,transaction:[]},
    1001:{acno:1001,username:"Arjun",password:1001,balance:1000,transaction:[]},
    1002:{acno:1002,username:"Maya",password:1002,balance:1000,transaction:[]},
  }
  register(acno:any,username:any,pswd:any){

  const data={
    acno,
    pswd,
    username,
  }

  return this.http.post('http://localhost:3000/register',data)

  //   let userDetails=this.userDetails;
  //   if(acno in userDetails){
  //     return false;
  //   }
  //   else{

  //     userDetails[acno]={
  //       acno,
  //       username,
  //       password,
  //       balance:0,
  //       transaction:[]
  //     }
  //     this.saveDetails();
  //     console.log(userDetails);
  //     return true;
      
  //   }
  }
  login(acno:any,pswd:any){
    const data={
      acno,
      pswd,
      
    }
    return this.http.post('http://localhost:3000/login',data)
    // let userDetails=this.userDetails;
    // if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     this.currentUser=userDetails[acno]['username']
    //     this.currentAcno=acno;
    //     this.saveDetails();
    //     return true;
    //   }
    //   else{
    //     return false;
    //   }
    // }
    // else{
    //   return false;
    // }

  }
  getToken(){
    //fetch token from localstorage
    const token=JSON.parse(localStorage.getItem('token')||'');
    //append token inside the header
    let headers=new HttpHeaders()
    if(token){
      options.headers=headers.append('x-access-token',token)
    } 
    return options //to get token    
  }
  deposite(acno:any,pswd:any,amt:any){
    const data={
      acno,
      pswd,
      amount:amt
      
    }
    return this.http.post('http://localhost:3000/deposite',data,this.getToken())


    // var amount=parseInt(amt)
    // let userDetails=this.userDetails;
    // if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     userDetails[acno]['balance']+=amount;
    //     userDetails[acno]['transaction'].push({
    //       Type:'Credit',
    //       Amount:amount
    //     })
    //     this.saveDetails();
    //     console.log(userDetails);
        
    //     return userDetails[acno]['balance']
    //   }
    //   else{
    //     alert('password mismatch')
    //     return false;
    //   } 
    // }
    // else{
    //   alert('invalid data')
    //   return false;
    // }
  }
 
  withdraw(acno:any,pswd:any,amt:any){
    
    const data={
      acno,
      pswd,
      amount:amt
      
    }
    return this.http.post('http://localhost:3000/withdraw',data,this.getToken())

    
  //   var amount=parseInt(amt)
  //   let userDetails=this.userDetails;
  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno]['password']){
  //       if(userDetails[acno]['balance']>amount){
  //         userDetails[acno]['balance']-=amount;
  //         userDetails[acno]['transaction'].push({
  //           Type:'Dedit',
  //           Amount:amount
  //         })
  //         this.saveDetails();
  //         return userDetails[acno]['balance']
  //       }
  //       else{
  //         alert('Transaction failed')
  //         return false

  //       }
  //     }
  //       else{
  //         alert('password mismatch')
  //         return false;
  //       } 
        
       
  //   }
  //   else{
  //     alert('invalid data')
  //     return false;
  //   }

   }
  getTransaction(acno:any){
    const data={
      acno
    }
    return this.http.post('http://localhost:3000/transaction',data,this.getToken())
    //details of transaction
}
deleteAcc(acno:any){
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
}

}
