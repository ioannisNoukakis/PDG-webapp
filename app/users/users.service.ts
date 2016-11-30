import { Injectable }               from '@angular/core';
import {Http}                       from '@angular/http';
import { Response }                 from '@angular/http';
import { Headers, RequestOptions }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import { Token }                    from '../login/token';
import {Router}                     from '@angular/router';
import {FriendModel}                from '../friend/friend.model' 

@Injectable()
export class UserService {
    // URL to web api
    private apiURL = 'https://api.eventail.me/users';
    private headers: Headers;

    constructor(private _http: Http, private _router: Router) { 
        this.headers = new Headers();
        this.headers.append('Accept', 'application/json');
    }

    public getUsers(users : FriendModel[]){
        console.log("[UERS_SERVICE] Sending firends user request...");
 
        return this._http.get(this.apiURL, { headers: this.headers })
            .map(res => res.json())
            .subscribe(
                data => this.updateList(data, users),
                err => this.logError(err),
                () => {
                 }
            );

    }

    public updateList(data, users: FriendModel[])
    {
        for (let user of data) {
            users.push(user);
        }
    }

    public logError(error)
    {
        console.log(error);
    }
}