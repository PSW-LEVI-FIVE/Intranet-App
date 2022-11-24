import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualLeaveComponent } from './annual-leave.component';

describe('AnnualLeaveComponent', () => {
  let component: AnnualLeaveComponent;
  let fixture: ComponentFixture<AnnualLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
