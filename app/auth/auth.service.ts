import { Token }          from '../login/token';
import { Injectable }     from '@angular/core';
import { Router }    from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import {Http} from '@angular/http';
import { Response } from '@angular/http';
import { UserModel } from '../user/user.model'

/**
 * Authentification service. It's a placeholder for all the auth data. Theses data are available to 
 * any class wishing to access them.
 */
@Injectable()
export class AuthService {
  private _token: Token;
  private userID;
  private userDetails : UserModel;
  private rank: number;

/**
 * constructor
 */
  constructor(private _http: Http, private _router: Router)
  {
    this._token = JSON.parse(localStorage.getItem('EventailToken'));
    this.userID = parseInt(localStorage.getItem('EventailUserID'));
    this.rank = parseInt(localStorage.getItem('EventailRank'));
    this.userDetails = JSON.parse(localStorage.getItem('EventailUserDetail'));
  }

  /**
  * Return the token of this user. If there are no connected users navigates to '/login'.
  */
  public getToken(): Token
  {
    if(this._token == null || this._token==undefined)
        this._router.navigateByUrl('/login');
    return this._token;
  }

  /**
   * Checks if the user is connected and if his token is at a valid date.
   * If not tries to 'refresh' the token. If it failes navigates to '/login'.
   */
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
      if(difference_ms/one_day >= 0) //can renew
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
      else{
        this._router.navigateByUrl('/login');
      }
    }

    return true;
  }

/**
 * Sets the userID.
 */
  public setUserID(userID: number)
  {
    localStorage.setItem('EventailUserID', ""+userID);
    this.userID = userID;
  }

 /**
 * Gets the userID.
 */
  public getUserId():number{
    return this.userID;
  }

  /**
   * Sets the token.
   */
  public setToken(token: Token)
  {
    console.log(token);
    localStorage.setItem('EventailToken', JSON.stringify(token));
    this._token = token;
  }

  /**
   * Logs out this user.
   */
  public logout()
  {
    localStorage.clear();
    this._token = null;
  }

  /**
   * Sets this user's rank.
   */
  public setRank(rank:number)
  {
    localStorage.setItem('EventailRank', ""+rank);
    this.rank = rank;
  }

  /**
   *Gets this user's rank.
   */
  public getRank():number{
    return this.rank;
  }

  /**
   * Gets this user details.
   */
  public getUserDetails():UserModel{
    return this.userDetails;
  }

  /**
   * Sets this user details.
   */
  public setUserDetails(userDetails: UserModel)
  {
    localStorage.setItem('EventailUserDetail', JSON.stringify(userDetails));
    this.userDetails = userDetails;
  }
}