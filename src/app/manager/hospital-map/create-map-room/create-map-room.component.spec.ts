import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMapRoomComponent } from './create-map-room.component';

describe('CreateMapRoomComponent', () => {
  let component: CreateMapRoomComponent;
  let fixture: ComponentFixture<CreateMapRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMapRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMapRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
