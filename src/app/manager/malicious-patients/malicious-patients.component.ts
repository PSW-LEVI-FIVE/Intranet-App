import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaliciousPatientsService } from './services/malicious-patients.service';
import { IMaliciousPatient } from './model/malicious-patients.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-malicious-patients',
  templateUrl: './malicious-patients.component.html',
  styleUrls: ['./malicious-patients.component.css']
})
export class MaliciousPatientsComponent {


  public dataSource = new MatTableDataSource<IMaliciousPatient>();
  public maliciousPatients: IMaliciousPatient[] = [];
  public displayedColumns = ['Patient', 'NumberOfCanceled', 'Blocked'];
  public patientsChecker: IMaliciousPatient[] = [];

  constructor(private maliciousPatientsService: MaliciousPatientsService, private router: Router) { }
  
  ngOnInit(): void {
    this.maliciousPatientsService.getMaliciousPatients().subscribe(res => {
      this.maliciousPatients = res;
      this.patientsChecker = JSON.parse(JSON.stringify(this.maliciousPatients));
      this.dataSource.data = this.maliciousPatients.sort((a, b) => 0.5 - Math.random());
    })
  }

  public saveChanges(){
    var blockingPatients: IMaliciousPatient[] = [];
    var patientsChecker = this.patientsChecker;
    this.maliciousPatients.forEach(function (patientToPush) {
      var patientToChecker = patientsChecker.find((patient: IMaliciousPatient) => patient.id === patientToPush.id);
        if((patientToPush.id === patientToChecker?.id) && (patientToPush.blocked !== patientToChecker?.blocked)){
          blockingPatients.push(patientToChecker)
        }
      });
      blockingPatients.forEach( (patient) => {
      this.blockingUnblockingPatients(patient);
    });
  }

  public blockingUnblockingPatients(patient: IMaliciousPatient){
    if(!patient.blocked) 
    this.maliciousPatientsService.blockPatient(patient).subscribe(res => {
    });
    else this.maliciousPatientsService.unblockPatient(patient).subscribe(res => {
    });
  }

  public BlockedStatusChange(maliciousPatient: IMaliciousPatient){
    maliciousPatient.blocked = !maliciousPatient.blocked;
  }

}
