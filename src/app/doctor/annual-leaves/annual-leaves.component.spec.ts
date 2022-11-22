import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualLeavesComponent } from './annual-leaves.component';

describe('AnnualLeavesComponent', () => {
  let component: AnnualLeavesComponent;
  let fixture: ComponentFixture<AnnualLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualLeavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
