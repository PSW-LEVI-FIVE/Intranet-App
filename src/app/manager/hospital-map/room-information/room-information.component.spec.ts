import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInformationComponent } from './room-information.component';

describe('RoomInformationComponent', () => {
  let component: RoomInformationComponent;
  let fixture: ComponentFixture<RoomInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
