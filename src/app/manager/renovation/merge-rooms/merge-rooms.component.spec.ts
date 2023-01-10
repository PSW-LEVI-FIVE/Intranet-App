import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeRoomsComponent } from './merge-rooms.component';

describe('MergeRoomsComponent', () => {
  let component: MergeRoomsComponent;
  let fixture: ComponentFixture<MergeRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MergeRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
