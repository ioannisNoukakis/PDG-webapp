import { Component }   from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { Router }      from '@angular/router'
import { FriendModel } from './friend.model'
import { Observable }  from 'rxjs/Observable';

@Component({
    selector: 'friend',
    templateUrl: './friend.component.html'
})

export class FriendComponent{

    users : FriendModel[] = [];

    constructor(private _auth: AuthService, private _router: Router){
    }

    username :String = "";

    onSubmit() { 
        console.log("miaw");
    }
}