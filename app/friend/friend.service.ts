import { Injectable }  from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HTTPService } from '../http/http.service';
import { Observable }  from 'rxjs/Rx';
import { HeaderModel } from '../http/header.model';
import { Response }    from '@angular/http';
import { UserModel }   from '../mapView/user.model'

@Injectable()
export class MapViewService {
    public constructor(private httpService:HTTPService, private auth: AuthService, private router: Router)
    {
    }

    public getFriends(): Observable<UserModel[]>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doGet('https://api.eventail.me/users/self/friends', additionnalsHeaders)
        .map((obj: Object) => <UserModel[]>(obj));
    }

    public addFriend(userID: number): Observable<Response>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doPut('https://api.eventail.me/users/self/friends/'+userID, additionnalsHeaders);
    }

    public deleteFriend(friendID: number): Observable<Response>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doDelete('https://api.eventail.me/users/self/friends/'+friendID, additionnalsHeaders);
    }
}