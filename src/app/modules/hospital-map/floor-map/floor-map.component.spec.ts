import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorMapComponent } from './floor-map.component';

describe('FloorMapComponent', () => {
  let component: FloorMapComponent;
  let fixture: ComponentFixture<FloorMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloorMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
