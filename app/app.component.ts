import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'my-app',
  template: `
    <nav>
      <a routerLink="/login" routerLinkActive="active">Login</a>
      <a routerLink="/mapView" routerLinkActive="active">Map View</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  providers: [ AuthService ]
})
export class AppComponent { }

/*
<nav>
  <a routerLink="/login" routerLinkActive="active">Login</a>
</nav>
*/