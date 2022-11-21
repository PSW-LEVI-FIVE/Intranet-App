import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodOrdersComponent } from './blood-orders.component';

describe('BloodOrdersComponent', () => {
  let component: BloodOrdersComponent;
  let fixture: ComponentFixture<BloodOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
