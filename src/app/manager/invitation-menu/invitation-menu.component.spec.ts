import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationMenuComponent } from './invitation-menu.component';

describe('InvitationMenuComponent', () => {
  let component: InvitationMenuComponent;
  let fixture: ComponentFixture<InvitationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
