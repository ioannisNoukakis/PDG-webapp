import { Component }   from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { Router }      from '@angular/router'
import { Observable }  from 'rxjs/Observable';
import { UserModel }   from '../mapView/user.model'
import { RegisterModel } from './register.model'
import { RegisterService } from './register.service'

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [RegisterService]
})

export class RegisterComponent{
    private registerModel: RegisterModel = new RegisterModel("", "", "", "", "");
    private cpassword: string;

    constructor(private _auth: AuthService, private _router: Router, private registerService:RegisterService){
    }

    public doRegister()
    {
        if(this.cpassword != this.registerModel.password)
        {
            alert("The two passwords you provided must match!");
            this.cpassword = "";
            this.registerModel.password = "";
            return;
        }
        this.registerService.register(this.registerModel)
        .subscribe(success => {
            this._router.navigateByUrl('/login');
        },
        error => alert("This username is already taken.")
        );
    }
}