import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualLeaveReviewComponent } from './annual-leave-review.component';

describe('AnnualLeaveReviewComponent', () => {
  let component: AnnualLeaveReviewComponent;
  let fixture: ComponentFixture<AnnualLeaveReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualLeaveReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualLeaveReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
