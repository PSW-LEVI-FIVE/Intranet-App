import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorStatisticsLeavesComponent } from './doctor-statistics-leaves.component';

describe('DoctorStatisticsLeavesComponent', () => {
  let component: DoctorStatisticsLeavesComponent;
  let fixture: ComponentFixture<DoctorStatisticsLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorStatisticsLeavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorStatisticsLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
