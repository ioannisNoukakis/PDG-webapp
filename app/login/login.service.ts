import { Injectable }     from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import { Response } from 'angular2/http';
import { Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Token } from './token';
import {LoginModel} from './login.model'
import 'rxjs/add/operator/map'

@Injectable()
export class LoginService {
    // URL to web api
    private apiURL = 'https://api.eventail.me/auth/token';
    private headers: Headers;
    private token: Token;

    constructor(private _http: Http) { 
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public GetToken(loginModel: LoginModel){
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
            this.token = new Token(jwt.token, jwt.string, false);
            console.log(this.token);
        }
    }

    public logError(error)
    {
        console.log(error);
    }

    public getToken()
    {
        return this.token;
    }
}