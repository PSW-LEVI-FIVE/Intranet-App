import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private burgerObs: BehaviorSubject<boolean> = new BehaviorSubject(true)
  constructor() { }

  public getBurgerState() {
    return this.burgerObs
  }


  public setBurgerState(val: boolean) {
    this.burgerObs.next(val)
  }

}
