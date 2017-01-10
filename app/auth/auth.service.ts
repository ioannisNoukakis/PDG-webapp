import { Token }          from '../login/token';
import { Injectable }     from '@angular/core';

@Injectable()
export class AuthService {
  private _token: Token;
  private userID;
  private rank: number;

  constructor()
  {
    this._token = JSON.parse(localStorage.getItem('EventailToken'));
    this.userID = parseInt(localStorage.getItem('EventailUserID'));
    this.rank = parseInt(localStorage.getItem('EventailRank'));
  }

  public getToken(): Token
  {
    return this._token;
  }

  public isConnected(): boolean
  {
    if(this._token == null)
      return false;

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
}