import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TherapiesDto } from '../../model/therapiesDto.model';
import { TherapyService } from '../../services/therapy.service';

@Component({
  selector: 'app-therapy-view',
  templateUrl: './therapy-view.component.html',
  styleUrls: ['./therapy-view.component.css']
})
export class TherapyViewComponent implements OnInit {

  public therapiesDisplay: TherapiesDto[] = []
  public columns: string[] = ["No.", "Type", "Name", "Quantity", "Date of prescribing"]
  public counter: number = 1;

  constructor(private readonly therapyService: TherapyService,
    private readonly router: Router,
    private route: ActivatedRoute,) { }

  public hospitalization: number = Number(this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    this.therapyService.getHospitalizationTherapies(this.hospitalization).subscribe(res => {
      this.therapiesDisplay = res;
      this.giveNameByType(this.therapiesDisplay);
      this.assignPosition(this.therapiesDisplay)
      this.counter = 1;
    })
  }

  giveNameByType(therapies: TherapiesDto[]) { //ovde za krv po tipu da se ispise
    therapies.forEach(element => {
      if (element.typeBlood == 0)
        element.bloodName = "A positive";
      else if (element.typeBlood == 1)
        element.bloodName = "A negative";
      else if (element.typeBlood == 2)
        element.bloodName = "B positive";
      else if (element.typeBlood == 3)
        element.bloodName = "B negative";
      else if (element.typeBlood == 4)
        element.bloodName = "AB positive";
      else if (element.typeBlood == 5)
        element.bloodName = "AB negative";
      else if (element.typeBlood == 6)
        element.bloodName = "0 positive";
      else
        element.bloodName = "0 negative";
    });
  }

  format(dt: Date | null) {
    if (dt == null) return ""
    let date = new Date(dt)
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  assignPosition(therapies: TherapiesDto[]) {
    therapies.forEach(element => {
      element.position = this.counter;
      this.counter += 1;
    })
  }
}
