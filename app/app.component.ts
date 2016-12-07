import { Component } from '@angular/core';
import { PagesModel } from './pages.model';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent { 

    constructor(private _auth: AuthService){
    }

    onLogout() { 
        this._auth.logout();
    }
}