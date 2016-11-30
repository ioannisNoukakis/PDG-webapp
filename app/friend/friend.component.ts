import {Component} from '@angular/core'
import {AuthService} from '../auth/auth.service'
import {Router} from '@angular/router'
import {UserService} from '../users/users.service'
import {FriendModel} from './friend.model'
import { Observable }from 'rxjs/Observable';

@Component({
    selector: 'friend',
    templateUrl: 'app/friend/friend.component.html'
})

export class FriendComponent{

    users : FriendModel[] = [];

    constructor(private _auth: AuthService, private _router: Router, private userService :UserService){
        userService.getUsers(this.users);
    }

    username :String = "";

    onSubmit() { 
        console.log("miaw");
    }
}