import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';
import { Router }    from '@angular/router';

/**
 * Class for the main component of this app.
 */
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent { 

    /**
     * constructor
     */
    constructor(private _auth: AuthService, private _router: Router){

    }

    /**
     * Logs out this user.
     */
    onLogout() { 
        this._auth.logout();
        this._router.navigateByUrl('/login');
    }
}