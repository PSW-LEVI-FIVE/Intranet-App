import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  animations: [
    trigger('menuLoading', [
      transition(':enter', [
        query('.item', [
          style({
            opacity: 0,
            transform: 'translateX(-100px)'
          }),
          stagger(100, [
            animate('600ms 0.2s ease-in-out',
              style({
                opacity: 1,
                transform: 'translateX(0px)'
              }))
          ])
        ])
      ])
    ])
  ]
})
export class SideMenuComponent implements OnInit {

  private burgerState: boolean = true;
  constructor(
    private readonly menuService: MenuService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }


  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(["/"]);

  }

  toggleBurger() {
    this.burgerState = !this.burgerState
    this.menuService.setBurgerState(this.burgerState)
  }

}
