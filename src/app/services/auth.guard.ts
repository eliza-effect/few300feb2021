import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectIsLoggedIn } from '../reducers';


@Injectable()
export class AuthGuard implements CanActivate {

  loggedIn: boolean;

  constructor(store: Store<AppState>, private router: Router) {
    store.select(selectIsLoggedIn).subscribe(on => this.loggedIn = true);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loggedIn) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
