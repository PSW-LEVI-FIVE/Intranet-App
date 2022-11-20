import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MedicalRecord } from '../../../model/medical-record.model';

@Component({
  selector: 'app-medical-record-header',
  templateUrl: './medical-record-header.component.html',
  styleUrls: ['./medical-record-header.component.css']
})
export class MedicalRecordHeaderComponent implements OnInit {

  @Input() medicalRecord: MedicalRecord | null = null
  @Output() search: EventEmitter<string> = new EventEmitter()
  public searchText: FormControl = new FormControl()
  constructor() { }

  ngOnInit(): void {
  }

  emitSearch() {
    console.log(this.searchText.value)
    this.search.emit(this.searchText.value)
  }

}
