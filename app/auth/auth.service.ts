import { Token }          from '../login/token';
import { Injectable }     from '@angular/core';

@Injectable()
export class AuthService {
  private _token: Token;

  public getToken(): Token
  {
    return this._token;
  }

  public isConnected(): boolean
  {
    if(this._token == null)
      return false;

    var time = new Date().getTime() - new Date(this._token.expires).getTime();
    return time >= 0;
  }
}