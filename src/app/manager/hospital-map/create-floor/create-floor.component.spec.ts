import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFloorComponent } from './create-floor.component';

describe('CreateFloorComponent', () => {
  let component: CreateFloorComponent;
  let fixture: ComponentFixture<CreateFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFloorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
