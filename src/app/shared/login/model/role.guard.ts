import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next : ActivatedRouteSnapshot,
    state : RouterStateSnapshot) : boolean{
      
        if(localStorage.getItem('role') == "Doctor")
            return true;
        else
            this.router.navigate(['/']);
            return false;
    }

  
}
