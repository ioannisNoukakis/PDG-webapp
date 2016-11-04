import { Injectable }     from '@angular/core';
import {Http} from '@angular/http';
import { Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Token } from './token';
import {LoginModel} from './login.model'
import 'rxjs/add/operator/map'
import {AuthService} from '../auth/auth.service'

@Injectable()
export class LoginService {
    // URL to web api
    private apiURL = 'https://api.eventail.me/auth/token';
    private headers: Headers;

    constructor(private _http: Http, private _auth: AuthService) { 
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this._auth = _auth;
    }

    public requestToken(loginModel: LoginModel){
        console.log("[LOGIN_SERVICE] Sending authentification request...");
        let credentials = JSON.stringify({ mail : loginModel.username, pass : loginModel.password });
 
        this._http.post(this.apiURL, credentials, { headers: this.headers })
            .map(res => res.json())
            .subscribe(
                data => this.saveJwt(data),
                err => this.logError(err),
                () => console.log("[LOGIN_SERVICE] Authentication Complete.")
            );
    }

    saveJwt(jwt) {
        if(jwt) {
            this._auth.setToken(new Token(jwt.token, jwt.string, false));
            console.log(this._auth.getToken());
        }
    }

    public logError(error)
    {
        console.log(error);
    }
}