import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";




@Injectable
(
    {
        providedIn: 'root'
    }
)
export class AuthGuard implements CanActivate{
    constructor(private router: Router){
        

    }
    canActivate(
        next : ActivatedRouteSnapshot,
        state : RouterStateSnapshot) : boolean{
            if(localStorage.getItem('role') == "Manager")
                return true;
            else
                this.router.navigate(['/']);
                return false;
        }
    
}