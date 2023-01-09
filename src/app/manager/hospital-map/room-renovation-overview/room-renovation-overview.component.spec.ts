import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomRenovationOverviewComponent } from './room-renovation-overview.component';

describe('RoomRenovationOverviewComponent', () => {
  let component: RoomRenovationOverviewComponent;
  let fixture: ComponentFixture<RoomRenovationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomRenovationOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomRenovationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
