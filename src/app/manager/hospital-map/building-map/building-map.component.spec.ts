import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingMapComponent } from './building-map.component';

describe('BuildingMapComponent', () => {
  let component: BuildingMapComponent;
  let fixture: ComponentFixture<BuildingMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
