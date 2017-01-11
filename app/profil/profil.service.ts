import { Injectable }  from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HTTPService } from '../http/http.service';
import { Observable }  from 'rxjs/Rx';
import { HeaderModel } from '../http/header.model';
import { Response }    from '@angular/http';
import { RegisterModel } from '../register/register.model'

/**
 * Service for the Profil component.
 */
@Injectable()
export class ProfilService {

    /**
     * constructor
     */
    public constructor(private httpService:HTTPService, 
                       private auth: AuthService, 
                       private router: Router)
    {
    }

    /**
     * Updates in the API this user.
     */
    public update(registerModel: RegisterModel):Observable<Response>
    {
         return this.httpService.doPatch(registerModel,'https://api.eventail.me/users/self')
    }
}