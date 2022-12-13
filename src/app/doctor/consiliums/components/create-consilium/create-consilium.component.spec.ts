import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConsiliumComponent } from './create-consilium.component';

describe('CreateConsiliumComponent', () => {
  let component: CreateConsiliumComponent;
  let fixture: ComponentFixture<CreateConsiliumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateConsiliumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateConsiliumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
