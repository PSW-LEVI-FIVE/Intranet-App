import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitRoomComponent } from './split-room.component';

describe('SplitRoomComponent', () => {
  let component: SplitRoomComponent;
  let fixture: ComponentFixture<SplitRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
