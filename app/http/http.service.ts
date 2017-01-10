import { Injectable }     from '@angular/core';
import {Http} from '@angular/http';
import { Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import {AuthService} from '../auth/auth.service'
import {Router} from '@angular/router'
import {HeaderModel} from './header.model'

@Injectable()
export class HTTPService {

    constructor(private _http: Http) { 
    }

    public doPost(body: Object, url: string, pHeaders: HeaderModel[]): Observable<Object[]>{
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        pHeaders.forEach(
            function(header)
            {
                headers.append(header.key, header.value);
            }
        );

        let bodyString = JSON.stringify(body);
        let options = new RequestOptions({ headers: headers });

        return this._http.post(url, bodyString, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public doPatch(body: Object, url: string, pHeaders: HeaderModel[]): Observable<Response>
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        pHeaders.forEach(
            function(header)
            {
                headers.append(header.key, header.value);
            }
        );

        let bodyString = JSON.stringify(body);
        let options = new RequestOptions({ headers: headers });

        return this._http.patch(url, bodyString, options)
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public doGet(url: string, pHeaders: HeaderModel[]): Observable<Object[]>{
 
        let headers = new Headers();
        headers.append('Accept', 'application/json');

        pHeaders.forEach(
            function(header)
            {
                headers.append(header.key, header.value);
            }
        );
        let options = new RequestOptions({ headers: headers });

        return this._http.get(url, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public doDelete(url: string, pHeaders: HeaderModel[]): Observable<Response>
    {
        let headers = new Headers();

        pHeaders.forEach(
            function(header)
            {
                headers.append(header.key, header.value);
            }
        );

        let options = new RequestOptions({ headers: headers });

        return this._http.delete(url, options)
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public doPut(body:Object,url: string, pHeaders: HeaderModel[]): Observable<Response>
    {
        let headers = new Headers();

        pHeaders.forEach(
            function(header)
            {
                headers.append(header.key, header.value);
            }
        );

        let options = new RequestOptions({ headers: headers });

        return this._http.put(url,body, options)
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}