import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Input() item: string|undefined;
  // @Input -used to hold data from the parent component
  //@Output -used to hold data from the child component
@Output() onCancel = new EventEmitter();//decorator
@Output() onDelete = new EventEmitter();//decorator
  //Oncancel - userdefined event
  constructor() { }

  ngOnInit(): void {
  }
  cancel(){
    this.onCancel.emit();
  }
  delete(){
    // alert('delete clicked')
    this.onDelete.emit(this.item)
  }
}
