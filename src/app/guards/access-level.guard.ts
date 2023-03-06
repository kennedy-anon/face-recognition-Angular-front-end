import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessLevelGuard implements CanActivate {
  accessLevels : any = []

  constructor(private authService: AuthService, private router: Router) {}

  // check if the user has access
  compareAccessLevels(requiredAccessLevel: any, accessLevels: any): boolean {
    return accessLevels.includes(requiredAccessLevel[0]);
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const requiredAccessLevel = route.data['accessLevels']; // required access level
      return this.authService.retrieveAccessLevels().pipe(
        map(res => {
          if (this.compareAccessLevels(requiredAccessLevel, res)){
            // authorized to view the page
            return true;
          } else {
            // has no access to the page
            return false;
          }
        })
      )
  }
  
}
