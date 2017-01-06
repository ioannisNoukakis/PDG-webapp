import { Injectable }  from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HTTPService } from '../http/http.service';
import { EventModel }  from './event.model';
import { POIModel }    from './POI.model';
import { Observable }  from 'rxjs/Rx';
import { HeaderModel } from '../http/header.model';
import { Response }    from '@angular/http';
import { UserModel }   from './user.model';

@Injectable()
export class MapViewService {
    public constructor(private httpService:HTTPService, private auth: AuthService, private router: Router)
    {
    }

    public getEventNearby(lat: number, lon: number, radius: number): Observable<EventModel[]>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doGet('https://api.eventail.me/events/nearby?lat='+lat+'&lon=' + lon + '&radius=' + radius, additionnalsHeaders)
        .map((obj: Object) => <EventModel[]>(obj));
    }

    public saveEvent(body: Object): Observable<EventModel>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doPost(body,'https://api.eventail.me/events', additionnalsHeaders)
        .map((obj: Object) => <EventModel>(obj));
    }

    public updateEvent(body: Object, idEvent: number): Observable<Response>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doPatch(body,'https://api.eventail.me/events/'+ idEvent, additionnalsHeaders);
    }

    public deleteEvent(idEvent: number): Observable<Response>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doDelete('https://api.eventail.me/events/'+ idEvent, additionnalsHeaders);
    }

    public savePOI(body: Object, idEvent: number): Observable<POIModel>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doPost(body,'https://api.eventail.me/events/' + idEvent + '/poi', additionnalsHeaders)
        .map((obj: Object) => <POIModel>(obj));
    }

    public updatePOI(body: Object, idEvent: number, idPOI: number): Observable<Response>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doPatch(body,'https://api.eventail.me/events/'+ idEvent +'/poi/' + idPOI, additionnalsHeaders);
    }

    public deletePOI(idEvent: number, idPOI: number): Observable<Response>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doDelete('https://api.eventail.me/events/'+ idEvent +'/poi/' + idPOI, additionnalsHeaders);
    }

    public getPOIs(idEvent: number): Observable<POIModel[]>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doGet('https://api.eventail.me/events/' + idEvent +'/poi', additionnalsHeaders)
        .map((obj: Object) => <POIModel[]>(obj));
    }

    public getFriendsNearby(lat: number, lon: number, radius: number): Observable<UserModel[]>
    {
        var additionnalsHeaders : HeaderModel[] = [
            new HeaderModel('Authorization', "Token " + this.auth.getToken().token)
        ];

        return this.httpService.doGet('https://api.eventail.me/users/nearby?lat='+lat+'&lon='+lon+'&radius='+radius, additionnalsHeaders)
        .map((obj: Object) => <UserModel[]>(obj));
    }
}