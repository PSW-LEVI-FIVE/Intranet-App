import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAllocationFormComponent } from './room-allocation-form.component';

describe('RoomAllocationFormComponent', () => {
  let component: RoomAllocationFormComponent;
  let fixture: ComponentFixture<RoomAllocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomAllocationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAllocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
