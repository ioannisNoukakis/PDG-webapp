import { Component } from '@angular/core';
import { PagesModel } from './pages.model';
import {AuthService} from './auth/auth.service';
import { Router }    from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent { 

    constructor(private _auth: AuthService, private _router: Router){

    }

    onLogout() { 
        this._auth.logout();
        this._router.navigateByUrl('/login');
    }
}