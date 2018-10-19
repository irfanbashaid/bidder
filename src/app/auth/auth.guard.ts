import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GrabitService } from "../service/grabit.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private grabit : GrabitService,private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.grabit.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        this.grabit.deleteToken();
        return false;
      }
    return true;
  }
}