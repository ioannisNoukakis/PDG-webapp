import { Injectable }  from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HTTPService } from '../http/http.service';
import { EventModel }  from './event.model';
import { POIModel }    from './POI.model';
import { Observable }  from 'rxjs/Rx';
import { HeaderModel } from '../http/header.model';
import { Response }    from '@angular/http';
import { UserModel }   from '../user/user.model';

@Injectable()
export class MapViewService {
    /**
     * constructor
     */
    public constructor(private httpService:HTTPService, private auth: AuthService, private router: Router)
    {
    }

    /**
     * Get from the api a list of nearby events.
     */
    public getEventNearby(lat: number, lon: number, radius: number): Observable<EventModel[]>
    {
        return this.httpService.doGet('https://api.eventail.me/events/nearby?lat='+lat+'&lon=' + lon + '&radius=' + radius)
        .map((obj: Object) => <EventModel[]>(obj));
    }

    /**
     * Saves in the API this event.
     */
    public saveEvent(body: Object): Observable<EventModel>
    {
        return this.httpService.doPost(body,'https://api.eventail.me/events')
        .map((obj: Object) => <EventModel>(obj));
    }

    /**
     * Updates in the API this event.
     */
    public updateEvent(body: Object, idEvent: number): Observable<Response>
    {
       return this.httpService.doPatch(body,'https://api.eventail.me/events/'+ idEvent);
    }

    /**
     * Delete in the API this event.
     */
    public deleteEvent(idEvent: number): Observable<Response>
    {
        return this.httpService.doDelete('https://api.eventail.me/events/'+ idEvent);
    }

    /**
     * Saves in the API this point of interest.
     */
    public savePOI(body: Object, idEvent: number): Observable<POIModel>
    {
        return this.httpService.doPost(body,'https://api.eventail.me/events/' + idEvent + '/poi')
        .map((obj: Object) => <POIModel>(obj));
    }

    /**
     * Updates in the API this point of interest.
     */
    public updatePOI(body: Object, idEvent: number, idPOI: number): Observable<Response>
    {
        return this.httpService.doPatch(body,'https://api.eventail.me/events/'+ idEvent +'/poi/' + idPOI);
    }

    /**
     * Delete in the API this point of interest.
     */
    public deletePOI(idEvent: number, idPOI: number): Observable<Response>
    {
        return this.httpService.doDelete('https://api.eventail.me/events/'+ idEvent +'/poi/' + idPOI);
    }

    /**
     * Gets in the API all the point of interest of this event.
     */
    public getPOIs(idEvent: number): Observable<POIModel[]>
    {
        return this.httpService.doGet('https://api.eventail.me/events/' + idEvent +'/poi')
        .map((obj: Object) => <POIModel[]>(obj));
    }

    /**
     * Gets in the API your friends.
     */
    public getFriendsNearby(lat: number, lon: number, radius: number): Observable<UserModel[]>
    {
        return this.httpService.doGet('https://api.eventail.me/users/nearby?lat='+lat+'&lon='+lon+'&radius='+radius)
        .map((obj: Object) => <UserModel[]>(obj));
    }
}