import { Component, OnInit } from '@angular/core';
import { last } from 'rxjs';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
acno:any;//to hold the currentAcno
transaction:any;//to hold the transaction
  constructor(private ds:DataService) { //dependency injection
    this.acno=JSON.parse(localStorage.getItem('currentAcno')||'');
    this.ds.getTransaction(this.acno)
    .subscribe((result:any)=>{
      this.transaction=result.transaction
      console.log(this.transaction);
      
    },
    result=>{
      alert(result.error.message)
    }
    )
    // console.log(this.transaction);
    
  }

  ngOnInit(): void {
  }

}
