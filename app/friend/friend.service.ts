import { Injectable }  from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HTTPService } from '../http/http.service';
import { Observable }  from 'rxjs/Rx';
import { HeaderModel } from '../http/header.model';
import { Response }    from '@angular/http';
import { UserModel }   from '../mapView/user.model';
import {FriendshipRequestModel} from './friendRequest.model';


@Injectable()
export class FriendService {
    public constructor(private httpService:HTTPService, 
                       private auth: AuthService, 
                       private router: Router)
    {
    }

    public getFriends(): Observable<UserModel[]>
    {
        return this.httpService.doGet('https://api.eventail.me/users/self/friends')
        .map((obj: Object) => <UserModel[]>(obj));
    }

    public getPendingFriendshipRequests(): Observable<FriendshipRequestModel[]>
    {
         return this.httpService.doGet('https://api.eventail.me/users/self/friends/requests')
        .map((obj: Object) => <FriendshipRequestModel[]>(obj));
    }

    public addFriend(userID: number): Observable<Response>
    {
        return this.httpService.doPut({},'https://api.eventail.me/users/self/friends/requests/'+userID);
    }

    public confirmFriend(userID: number): Observable<Response>
    {
        return this.httpService.doPut({},'https://api.eventail.me/users/self/friends/'+userID);
    }

    public deleteFriendshipRequest(userID: number): Observable<Response>
    {
        return this.httpService.doDelete('https://api.eventail.me/users/self/friends/requests/'+userID);
    }

    public deleteFriend(friendID: number): Observable<Response>
    {
        return this.httpService.doDelete('https://api.eventail.me/users/self/friends/'+friendID);
    }
}