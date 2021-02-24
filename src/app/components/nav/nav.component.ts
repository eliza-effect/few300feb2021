import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppState, selectIsLoggedIn } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { logOutRequested } from 'src/app/actions/auth.actions';
import { onInitEffects } from '@ngrx/effects/src/lifecycle_hooks';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean>;

  isLoggedIn$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>) { }



  ngOnInit(): void {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);

  }

  logOut(): void {
    this.store.dispatch(logOutRequested());
  }
}
