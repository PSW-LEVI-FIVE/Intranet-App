import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorStatisticsWorkloadComponent } from './doctor-statistics-workload.component';

describe('DoctorStatisticsWorkloadComponent', () => {
  let component: DoctorStatisticsWorkloadComponent;
  let fixture: ComponentFixture<DoctorStatisticsWorkloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorStatisticsWorkloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorStatisticsWorkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
