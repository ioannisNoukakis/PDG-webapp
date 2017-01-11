import { Injectable }  from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HTTPService } from '../http/http.service';
import { Observable }  from 'rxjs/Rx';
import { HeaderModel } from '../http/header.model';
import { Response }    from '@angular/http';
import { UserModel }   from '../user/user.model';
import {FriendshipRequestModel} from './friendRequest.model';

/**
 * Service class for the friend component.
 */
@Injectable()
export class FriendService {
    /**
     * constructor
     */
    public constructor(private httpService:HTTPService, 
                       private auth: AuthService, 
                       private router: Router)
    {
    }

    /**
     * Gets in the API an array of users that are yours friends.
     */
    public getFriends(): Observable<UserModel[]>
    {
        return this.httpService.doGet('https://api.eventail.me/users/self/friends')
        .map((obj: Object) => <UserModel[]>(obj));
    }

    /**
     * Gets in the API an array of users that wants to be yours friends.
     */
    public getPendingFriendshipRequests(): Observable<FriendshipRequestModel[]>
    {
         return this.httpService.doGet('https://api.eventail.me/users/self/friends/requests')
        .map((obj: Object) => <FriendshipRequestModel[]>(obj));
    }

    /**
     * Create a friendship request in the API.
     */
    public addFriend(userID: number): Observable<Response>
    {
        return this.httpService.doPut({},'https://api.eventail.me/users/self/friends/requests/'+userID);
    }

    /**
     * Accept in the API a friendship request from this user.
     */
    public confirmFriend(userID: number): Observable<Response>
    {
        return this.httpService.doPut({},'https://api.eventail.me/users/self/friends/'+userID);
    }

    /**
     * Decline in the API a friendship request from this user.
     */
    public deleteFriendshipRequest(userID: number): Observable<Response>
    {
        return this.httpService.doDelete('https://api.eventail.me/users/self/friends/requests/'+userID);
    }

    /**
     * Destroy in the API a friendship with this user.
     */
    public deleteFriend(friendID: number): Observable<Response>
    {
        return this.httpService.doDelete('https://api.eventail.me/users/self/friends/'+friendID);
    }
}