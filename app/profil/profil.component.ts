import { Component }   from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { Router }      from '@angular/router'
import { Observable }  from 'rxjs/Observable';
import { RegisterModel } from '../register/register.model'
import { ProfilService } from './profil.service'
import {LoginModel} from '../login/login.model'


/**
 * Class for the Profil component.
 */
@Component({
    selector: 'profil',
    templateUrl: './profil.component.html',
    providers: [ProfilService]
})
export class ProfilComponent{
    private registerModel: RegisterModel = new RegisterModel("", "", "", "", "");

    /**
     * constructor
     */
    constructor(private _auth: AuthService, private _router: Router, private profilService:ProfilService){
        this.registerModel = new RegisterModel(this._auth.getUserDetails().username,
                            this._auth.getUserDetails().firstname,
                            this._auth.getUserDetails().lastname,
                            this._auth.getUserDetails().mail,
                            "");
    }

    /**
     * Updates this user profile in the API and updates in AuthService theses informations.
     */
    public doUpdate()
    {
        if( this.registerModel.firstname == "" || this.registerModel.lastname == "" || 
        this.registerModel.mail == "" || this.registerModel.username == ""){
            alert("You must fill all inputs (password is optional.");
            return;
        }
        let body = Object.assign({},this.registerModel);
        if(this.registerModel.password == "")
        {
            delete body.password;
        }
        this.profilService.update(body)
        .subscribe (
        success => {
            var userResponse = success.json();
            this.registerModel.username = userResponse.username;
            this.registerModel.firstname = userResponse.firstname;
            this.registerModel.lastname = userResponse.lastname;
            this.registerModel.mail = userResponse.mail;
            alert("Your settings have been sucessfully updated.");
        },
        error => 
        {
            alert("You can't have the same email as an other user.");
        }
        );
    }
}