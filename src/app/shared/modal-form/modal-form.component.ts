import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {


  @Output() closeModal: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  emitClose(event: any) {
    event.stopPropagation();
    if (event.target == event.currentTarget)
      this.closeModal.emit()
  }

}
