import {Component} from '@angular/core'
import {LoginService} from './login.service'
import {LoginModel} from './login.model'

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    providers: [LoginService]
})

export class LoginComponent{

    constructor(private _loginSevice: LoginService){
        this._loginSevice = _loginSevice;
    }

    loginModel = new LoginModel("ioannis.noukakis@heig-vd.ch", "ioannis");   
    submitted = false;

    onSubmit() { 
        this.submitted = true; 
        this._loginSevice.requestToken(this.loginModel);
    }
}