import { Injectable }     from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {HTTPService} from '../http/http.service';
import {EventModel} from './event.model';
import {Observable} from 'rxjs/Rx';
import {HeaderModel} from '../http/header.model'

@Injectable()
export class MapViewService {
    public constructor(private httpService:HTTPService, private auth: AuthService, private router: Router)
    {
    }

    public getEventNearby(lat: number, long: number, radius: number): Observable<EventModel>
    {
        let body = {lat:lat, long:long, radius:radius};
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', this.auth.getToken().token)
        ];

        this.httpService.doGet('https://api.eventail.me/events/nearby', additionnalsHeaders)
        .subscribe(
            data => console.log(data),
            err => console.log(err)
        );
        return new Observable<EventModel>();
    }

    public saveEvent(body: Object): Observable<EventModel>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doPost(body,'https://api.eventail.me/events', additionnalsHeaders)
        .map((obj: Object) => <EventModel>(obj));
    }
}