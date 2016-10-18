import {Component} from 'angular2/core'
import {LoginService} from './login.service'
import {LoginModel} from './login.model'

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    providers: [LoginService]
})

export class LoginComponent{

    loginModel = new LoginModel("ioannis.noukakis@heig-vd.ch", "ioannis");   
    submitted = false;

    constructor(private loginSevice: LoginService){
    }

    onSubmit() { 
        this.submitted = true; 
        this.loginSevice.GetToken(this.loginModel);
    }
}