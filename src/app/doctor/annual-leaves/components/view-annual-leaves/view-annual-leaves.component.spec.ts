import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnnualLeavesComponent } from './view-annual-leaves.component';

describe('ViewAnnualLeavesComponent', () => {
  let component: ViewAnnualLeavesComponent;
  let fixture: ComponentFixture<ViewAnnualLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAnnualLeavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAnnualLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
