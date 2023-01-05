import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommercialsComponent } from './create-commercials.component';

describe('CreateCommercialsComponent', () => {
  let component: CreateCommercialsComponent;
  let fixture: ComponentFixture<CreateCommercialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCommercialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCommercialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
