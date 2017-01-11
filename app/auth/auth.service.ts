import { Token }          from '../login/token';
import { Injectable }     from '@angular/core';
import { Router }    from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import {Http} from '@angular/http';
import { Response } from '@angular/http';
import { UserModel } from '../user/user.model'

@Injectable()
export class AuthService {
  private _token: Token;
  private userID;
  private userDetails : UserModel;
  private rank: number;

  constructor(private _http: Http, private _router: Router)
  {
    this._token = JSON.parse(localStorage.getItem('EventailToken'));
    this.userID = parseInt(localStorage.getItem('EventailUserID'));
    this.rank = parseInt(localStorage.getItem('EventailRank'));
    this.userDetails = JSON.parse(localStorage.getItem('EventailUserDetail'));
  }

  public getToken(): Token
  {
    if(this._token == null)
        this._router.navigateByUrl('/login');
    return this._token;
  }

  public isConnected(): boolean
  {
    if(this._token == null)
      return false;

    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;

    // Convert both dates to milliseconds
    var date1_ms = new Date(this._token.expires).getTime();
    var date2_ms = new Date().getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date1_ms - date2_ms;

    if(difference_ms/one_day < 1)
    {
      let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', "Token " + this._token);

        let options = new RequestOptions({ headers: headers });

        this._http.post('https://api.eventail.me/auth/extend', "{}", options)
            .map((res:Response) => res.json())
            .subscribe(
              res => {
                this._token.token = res.json().token;
                this._token.expires = res.json().expires;
              }
            );
    }

    return true;
  }

  public setUserID(userID: number)
  {
    localStorage.setItem('EventailUserID', ""+userID);
    this.userID = userID;
  }

  public getUserId():number{
    return this.userID;
  }

  public setToken(token: Token)
  {
    console.log(token);
    localStorage.setItem('EventailToken', JSON.stringify(token));
    this._token = token;
  }

  public logout()
  {
    localStorage.clear();
    this._token = null;
  }

  public setRank(rank:number)
  {
    localStorage.setItem('EventailRank', ""+rank);
    this.rank = rank;
  }

  public getRank():number{
    return this.rank;
  }

  public getUserDetails():UserModel{
    return this.userDetails;
  }

  public setUserDetails(userDetails: UserModel)
  {
    localStorage.setItem('EventailUserDetail', JSON.stringify(userDetails));
    this.userDetails = userDetails;
  }
}