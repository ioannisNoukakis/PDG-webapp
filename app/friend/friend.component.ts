import {Component} from '@angular/core'
import {AuthService} from '../auth/auth.service'
import {Router} from '@angular/router'

@Component({
    selector: 'friend',
    templateUrl: 'app/friend/friend.component.html'
})

export class FriendComponent{

    constructor(private _auth: AuthService, private _router: Router){
        if(!this._auth.isConnected())
        {
            this._router.navigateByUrl('/login');
        }
    }

    username :String = "";

    onSubmit() { 
        console.log("miaw");
    }
}