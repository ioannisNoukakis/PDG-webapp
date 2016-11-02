import {Component} from '@angular/core'
import {LoginService} from './login.service'
import {LoginModel} from './login.model'
import {AuthService} from '../auth/auth.service'

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    providers: [LoginService]
})

export class LoginComponent{

    loginModel = new LoginModel("ioannis.noukakis@heig-vd.ch", "ioannis");   
    submitted = false;

    constructor(private _loginSevice: LoginService){

    }

    onSubmit() { 
        this.submitted = true; 
        this._loginSevice.requestToken(this.loginModel);
    }
}