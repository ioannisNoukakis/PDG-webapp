import {Component} from 'angular2/core'
import {LoginService} from './login.service'
import {LoginModel} from './login.model'
import {AUTH_SERVICE_PROVIDER, AuthService } from '../auth.service'

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    providers: [LoginService]
})

export class LoginComponent{

    loginModel = new LoginModel("ioannis.noukakis@heig-vd.ch", "ioannis");   
    submitted = false;

    constructor(private _loginSevice: LoginService){
        if(AuthService.getInstance().isConnected())
        {
            
        }
    }

    onSubmit() { 
        this.submitted = true; 
        this._loginSevice.requestToken(this.loginModel);
    }
}