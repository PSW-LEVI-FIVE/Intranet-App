import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentRelocationOverviewComponent } from './equipment-relocation-overview.component';

describe('EquipmentRelocationOverviewComponent', () => {
  let component: EquipmentRelocationOverviewComponent;
  let fixture: ComponentFixture<EquipmentRelocationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentRelocationOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentRelocationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
