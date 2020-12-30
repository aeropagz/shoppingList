import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { AccountService } from './account.service';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService,
    
    ) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const jwtHelper = new JwtHelperService();
    const user = this.accountService.userValue;
    if(user && !jwtHelper.isTokenExpired(user.token)){
      return true;
    }
    this.router.navigate(['/login'],{queryParams: {returnUrl: state.url}});
    return false;
  }
}
