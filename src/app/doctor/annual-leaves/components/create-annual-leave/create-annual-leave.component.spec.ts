import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnualLeaveComponent } from './create-annual-leave.component';

describe('CreateAnnualLeaveComponent', () => {
  let component: CreateAnnualLeaveComponent;
  let fixture: ComponentFixture<CreateAnnualLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAnnualLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnnualLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
