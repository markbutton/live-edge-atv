import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserState } from '../state';
import { User } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userState: UserState, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = await this.getCurrentUser();
    if (currentUser) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(currentUser.group) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }
  }

  getCurrentUser(): Promise<User> {
    return new Promise((resolve) => {
      this.userState.user.subscribe((currentUser) => {
        if (currentUser) {
          return resolve(currentUser);
        }
      });
    });
  }

}
