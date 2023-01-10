import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invitation-menu',
  templateUrl: './invitation-menu.component.html',
  styleUrls: ['./invitation-menu.component.css']
})
export class InvitationMenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  navigate(where: string) {
    this.router.navigate(["/manager" + where])
  }
}
