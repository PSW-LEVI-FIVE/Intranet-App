import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBloodOrderComponent } from './create-blood-order.component';

describe('CreateBloodOrderComponent', () => {
  let component: CreateBloodOrderComponent;
  let fixture: ComponentFixture<CreateBloodOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBloodOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBloodOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
