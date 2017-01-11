import { Injectable }     from '@angular/core';
import {Http} from '@angular/http';
import { Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Token } from './token';
import {LoginModel} from './login.model'
import 'rxjs/add/operator/map'
import {AuthService} from '../auth/auth.service'
import {Router} from '@angular/router'
import { UserModel } from '../user/user.model'

/**
 * Service for the login component. As the HTTP request differs from usual it has it own method with http from Angular2.
 */
@Injectable()
export class LoginService {
    private apiURL = 'https://api.eventail.me/auth/token';
    private headers: Headers;

    /**
     * constructor
     */
    constructor(private _http: Http, private _auth: AuthService, private _router: Router) { 
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    /**
     * Request a token and all informations to be placed in the AuthService.
     */
    public requestToken(loginModel: LoginModel){
        if(!loginModel.username || !loginModel.password)
        {
            console.log("[LOGIN_SERVICE][E] Empty fields. Not sending.");
            return;
        }
        console.log("[LOGIN_SERVICE][I] Sending authentification request...");
        let credentials = JSON.stringify({ mail : loginModel.username, pass : loginModel.password });
 
        this._http.post(this.apiURL, credentials, { headers: this.headers })
            .map(res => res.json())
            .subscribe(
                data => 
                {
                    this.saveJwt(data);
                    console.log("[LOGIN_SERVICE][I] Authentication Complete.");
                    this._router.navigateByUrl('/mapView');
                 },
                err => 
                {
                    console.log(err);
                    alert(JSON.parse(err._body).message);
                    loginModel.password = "";
                    loginModel.username = "";
                }
            );
    }

    saveJwt(jwt) {
        if(jwt) {
            this._auth.setToken(new Token(jwt.token, jwt.expires, false));
            this._auth.setUserID(jwt.user.id);
            this._auth.setRank(jwt.user.rank);
            this._auth.setUserDetails(jwt.user);
        }
    }
}