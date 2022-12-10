import { Component, Input, OnInit } from '@angular/core';
import { Prescription } from '../../model/prescription.model';
import { Symptom } from '../../model/symptom.model';

@Component({
  selector: 'app-report-overview',
  templateUrl: './report-overview.component.html',
  styleUrls: ['./report-overview.component.css']
})
export class ReportOverviewComponent implements OnInit {
  @Input() report: string | undefined | null
  @Input() prescriptions: Prescription[] = []
  @Input() symptoms: Symptom[] = []

  constructor() { }

  ngOnInit(): void {

  }

}
