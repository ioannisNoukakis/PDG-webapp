import { Injectable }  from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HTTPService } from '../http/http.service';
import { Observable }  from 'rxjs/Rx';
import { HeaderModel } from '../http/header.model';
import { Response }    from '@angular/http';
import { UserModel }   from '../mapView/user.model';
import { RegisterModel } from './register.model'

@Injectable()
export class RegisterService {
    public constructor(private httpService:HTTPService, 
                       private auth: AuthService, 
                       private router: Router)
    {
    }

    public register(registerModel: RegisterModel):Observable<UserModel>
    {
        var additionnalsHeaders : HeaderModel[] = [];

        return this.httpService.doPost(registerModel,'https://api.eventail.me/auth/register', additionnalsHeaders)
        .map((obj: Object) => <UserModel>(obj));
    }
}