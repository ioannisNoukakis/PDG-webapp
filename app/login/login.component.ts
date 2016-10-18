import {Component} from 'angular2/core'
import {LoginService} from './login.service'
import {LoginModel} from './login.model'

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    providers: [LoginService]
})

export class LoginComponent{
    submitted = false;


    constructor(loginSevice: LoginService){
        loginSevice.getToken();
    }

    onSubmit() { this.submitted = true; }
}