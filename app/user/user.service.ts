import { Injectable }  from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HTTPService } from '../http/http.service';
import { Observable }  from 'rxjs/Rx';
import { HeaderModel } from '../http/header.model';
import { Response }    from '@angular/http';
import { UserModel }   from '../mapView/user.model';

@Injectable()
export class UserService {

    public constructor(private httpService:HTTPService, private auth: AuthService, private router: Router)
    {
    }

    public searchUser(q: string): Observable<UserModel[]>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doGet('https://api.eventail.me/users/search?q=' + q, additionnalsHeaders)
        .map((obj: Object) => <UserModel[]>(obj));
    }
}