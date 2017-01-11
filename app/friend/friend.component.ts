import { Component }   from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { Router }      from '@angular/router'
import { FriendModel } from './friend.model'
import { Observable }  from 'rxjs/Observable';
import { UserService } from '../user/user.service'
import { UserModel }   from '../user/user.model'
import { FriendService } from './friend.service'
import {FriendshipRequestModel} from './friendRequest.model';

/**
 * Class for the friend component.
 */
@Component({
    selector: 'friend',
    templateUrl: './friend.component.html',
    providers: [FriendService]
})
export class FriendComponent{

    private username :String = "";
    private friends : UserModel[] = [];
    private pendingFriends : FriendshipRequestModel[] = [];
    private foundUsers: UserModel[] = [];

    /**
     * constructor
     */
    constructor(private _auth: AuthService, private _router: Router, private userService: UserService,
                private friendService: FriendService){
        this.loadFriends();
    }

    /**
     * Retrives all the friends you have from the API. Puts them in the view.
     */
    private loadFriends()
    {
        this.friends = [];
        this.pendingFriends = [];

        this.friendService.getFriends()
        .subscribe(
            success => {
                success.forEach((element) =>
                {
                    this.friends.push(element);
                });
            },
            error => alert("Error: " + error)
        );

        this.friendService.getPendingFriendshipRequests()
        .subscribe(
            success =>
            {
                success.forEach((element) => {
                    this.pendingFriends.push(element);
                });
            },
            error => alert("Error: " + error)
        );
    }

    /**
     * Check if the searched user is in the pendingFriends or friends array.
     */
    private searchInFriendsAndInPending(username:string):boolean
    {
        this.friends.forEach((user) =>{
            if(username == user.username)
                return true;
        });

        this.pendingFriends.forEach((friendship) =>{
            if(username == friendship.user.username)
            return true;
        });
        return false;
    }

    /**
     * Event fired from the template when the search text input is modified. Show a list of suggestion for this new value.
     */
    onChange(newValue) {
        if(newValue.length > 0)
        {
            this.userService.searchUser(newValue)
            .subscribe(
                success => 
                {
                    this.foundUsers = [];
                    success.forEach((element) =>
                    {
                        if(!this.searchInFriendsAndInPending(newValue))
                            this.foundUsers.push(element);
                    });
                },
                error => alert("Error: " + error)
            );
        }
        else
            this.foundUsers = [];
    }

    /**
     * Creates a pending friend request in the API.
     */
    addFriend(u: UserModel)
    {
        this.friendService.addFriend(u.id)
        .subscribe(
            success => error => {
                alert("A friend request has been sent to this user. He/She must accept it in order for you two to be friends.");
            },
            error => alert("Your friend has already sent you a request.")
        );
        this.username =  "";
        this.foundUsers = [];
    }

    /**
     * Destroy in the API a friendship between you two.
     */
    deleteFriend(u: UserModel, index: number)
    {
        this.friendService.deleteFriend(u.id)
        .subscribe(
            success => error => alert("You are no longer friend with " + u.username + "."),
            error => alert("Error: " + error)
        );
        this.friends.splice(index, 1);
    }

    /**
     * Confirm your frienship with this user in the API.
     */
    confirmFriend(u: UserModel, index: number)
    {
        this.friendService.confirmFriend(u.id)
        .subscribe(
            success => error => alert("You and " + u.username + " are now friends!"),
            error => alert("Error: " + error)
        );
        this.friends.push(u);
        this.pendingFriends.splice(index, 1);
    }

    /**
     * Declines a frienship request in the API.
     */
    unconfirmFriend(u: UserModel, index: number)
    {
        this.friendService.deleteFriendshipRequest(u.id)
        .subscribe(
            success => error => alert("You declined friendship request from " + u.username),
            error => alert("Error: " + error)
        );
        this.pendingFriends.splice(index, 1);
    }
}