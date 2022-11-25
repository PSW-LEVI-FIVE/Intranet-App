import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRoomsComponent } from './search-rooms.component';

describe('SearchRoomsComponent', () => {
  let component: SearchRoomsComponent;
  let fixture: ComponentFixture<SearchRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
