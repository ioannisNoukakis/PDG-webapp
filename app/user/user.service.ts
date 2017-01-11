import { Injectable }  from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HTTPService } from '../http/http.service';
import { Observable }  from 'rxjs/Rx';
import { HeaderModel } from '../http/header.model';
import { Response }    from '@angular/http';
import { UserModel }   from '../user/user.model';
import { Headers, RequestOptions } from '@angular/http';
import {Http}          from '@angular/http';

/**
 * Global service.
 */
@Injectable()
export class UserService {

    /**
     * constructor
     */
    public constructor(private httpService:HTTPService, private auth: AuthService, private router: Router,
                       private _http: Http)
    {
    }

    /**
     * Searches a user with this query string. Return a list of possible users.
     */
    public searchUser(q: string): Observable<UserModel[]>
    {
        return this.httpService.doGet('https://api.eventail.me/users/search?q=' + q)
        .map((obj: Object) => <UserModel[]>(obj));
    }

    /**
     * Return your friends nearby.
     */
    public getUsersNearby(lat: number, lng: number, radius: number, all: boolean): Observable<UserModel[]>
    {
        return this.httpService.doGet('https://api.eventail.me/users/nearby?lat='+lat+'&lon='+lng+'&radius='+radius+'&all='+(this.auth.getRank() == 0))
        .map((obj: Object) => <UserModel[]>(obj));
    }

    /**
     * Get all registered user.
     */
    public getUsers(pageNumber: number): Observable<Response>
    {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', "Token " + this.auth.getToken().token);

        let options = new RequestOptions({ headers: headers });

        return this._http.get('https://api.eventail.me/users?count=5&page='+pageNumber, options);
    }

    /**
     * Changes a user's rank.
     */
    public changeUserRank(userID: number, rank: number): Observable<Response>
    {
        return this.httpService.doPut(rank, 'https://api.eventail.me/users/'+userID+'/rank');
    }
}