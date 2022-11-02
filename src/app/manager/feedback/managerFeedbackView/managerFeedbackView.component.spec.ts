import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerFeedbackViewComponent } from './managerFeedbackView.component';

describe('ManagerFeedbackViewComponent', () => {
  let component: ManagerFeedbackViewComponent;
  let fixture: ComponentFixture<ManagerFeedbackViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerFeedbackViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerFeedbackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
