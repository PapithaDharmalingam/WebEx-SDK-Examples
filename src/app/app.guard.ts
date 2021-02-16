import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { loginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class AppGuard implements CanActivate {
  constructor(private loginService: loginService,private router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean |UrlTree{

    return this.loginService.status == 'Log Out' ?true:this.router.createUrlTree(['']);
  }
}
