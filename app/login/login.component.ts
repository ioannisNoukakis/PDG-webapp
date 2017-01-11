import {Component} from '@angular/core'
import {LoginService} from './login.service'
import {LoginModel} from './login.model'
import {AuthService} from '../auth/auth.service'
import {Router} from '@angular/router'

/**
 * Class for the LoginComponent.
 */
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [LoginService]
})
export class LoginComponent{

    private loginModel = new LoginModel("", ""); 
    /**
     * constructor
     */
    constructor(private _loginSevice: LoginService, private _auth: AuthService, private _router: Router){
        if(this._auth.isConnected())
        {
            this._router.navigateByUrl('/mapView');
        }
    }
      
    /**
     * Method called from the template. Calls the login Method from the login service.
     */
    onSubmit() { 
        this._loginSevice.requestToken(this.loginModel);
    }
}