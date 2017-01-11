import { Injectable }  from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HTTPService } from '../http/http.service';
import { Observable }  from 'rxjs/Rx';
import { HeaderModel } from '../http/header.model';
import { Response }    from '@angular/http';
import { UserModel }   from '../user/user.model';
import { RegisterModel } from './register.model'

/**
 * Service for the register component.
 */
@Injectable()
export class RegisterService {

    /**
     * constructor
     */
    public constructor(private httpService:HTTPService, 
                       private auth: AuthService, 
                       private router: Router)
    {
    }

    /**
     * Register in the API this user.
     */
    public register(registerModel: RegisterModel):Observable<UserModel>
    {
         return this.httpService.doPost(registerModel,'https://api.eventail.me/auth/register')
        .map((obj: Object) => <UserModel>(obj));
    }
}