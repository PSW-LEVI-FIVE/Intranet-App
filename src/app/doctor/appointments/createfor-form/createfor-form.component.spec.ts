import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateforFormComponent } from './createfor-form.component';

describe('CreateforFormComponent', () => {
  let component: CreateforFormComponent;
  let fixture: ComponentFixture<CreateforFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateforFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateforFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
