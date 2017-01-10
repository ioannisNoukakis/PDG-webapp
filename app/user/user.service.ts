import { Injectable }  from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HTTPService } from '../http/http.service';
import { Observable }  from 'rxjs/Rx';
import { HeaderModel } from '../http/header.model';
import { Response }    from '@angular/http';
import { UserModel }   from '../mapView/user.model';
import { Headers, RequestOptions } from '@angular/http';
import {Http}          from '@angular/http';

@Injectable()
export class UserService {

    public constructor(private httpService:HTTPService, private auth: AuthService, private router: Router,
                       private _http: Http)
    {
    }

    public searchUser(q: string): Observable<UserModel[]>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doGet('https://api.eventail.me/users/search?q=' + q, additionnalsHeaders)
        .map((obj: Object) => <UserModel[]>(obj));
    }

    public getUsersNearby(lat: number, lng: number, radius: number, all: boolean): Observable<UserModel[]>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doGet('https://api.eventail.me/users/nearby?lat='+lat+'&lon='+lng+'&radius='+radius+'&all='+(this.auth.getRank() == 0), additionnalsHeaders)
        .map((obj: Object) => <UserModel[]>(obj));
    }

    public getUsers(pageNumber: number): Observable<Response>
    {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', "Token " + this.auth.getToken().token);

        let options = new RequestOptions({ headers: headers });

        return this._http.get('https://api.eventail.me/users?count=5&page='+pageNumber, options);
    }

    public changeUserRank(userID: number, rank: number): Observable<Response>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doPut(rank, 'https://api.eventail.me/users/'+userID+'/rank', additionnalsHeaders);
    }
}