import { Component }   from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { Router }      from '@angular/router'
import { Observable }  from 'rxjs/Observable';
import { RegisterModel } from '../register/register.model'
import { ProfilService } from './profil.service'
import {LoginService} from '../login/login.service'
import {LoginModel} from '../login/login.model'


@Component({
    selector: 'profil',
    templateUrl: './profil.component.html',
    providers: [ProfilService, LoginService]
})

export class ProfilComponent{
    private registerModel: RegisterModel = new RegisterModel("", "", "", "", "");


    constructor(private _auth: AuthService, private _router: Router, private profilService:ProfilService,
                private loginService : LoginService){
        this.registerModel = new RegisterModel(this._auth.getUserDetails().username,
                            this._auth.getUserDetails().firstname,
                            this._auth.getUserDetails().lastname,
                            this._auth.getUserDetails().mail,
                            "");
    }

    public doUpdate()
    {
        if(this.registerModel.password == "" || this.registerModel.firstname == "" || this.registerModel.lastname == "" || 
        this.registerModel.mail == "" || this.registerModel.username == ""){
            alert("You must fill all inputs.");
            return;
        }
        this.profilService.update(this.registerModel)
        .subscribe (
        success => alert("Your settings have been sucessfully updated."),
        error => 
        {
            alert(error);
            console.log(error);
        }
        );
    }
}