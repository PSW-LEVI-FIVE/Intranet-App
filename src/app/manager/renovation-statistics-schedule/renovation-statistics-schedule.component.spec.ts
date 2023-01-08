import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovationStatisticsScheduleComponent } from './renovation-statistics-schedule.component';

describe('RenovationStatisticsScheduleComponent', () => {
  let component: RenovationStatisticsScheduleComponent;
  let fixture: ComponentFixture<RenovationStatisticsScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenovationStatisticsScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenovationStatisticsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
