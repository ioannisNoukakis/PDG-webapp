import { Token }          from './login/token';
import { provide }        from 'angular2/core'

export class AuthService {
  private _token: Token;
  private static _instance: AuthService = null;

  public static getInstance(): AuthService {
    if (AuthService._instance === null) {
       AuthService._instance = new AuthService();
    }
    return AuthService._instance;
  }

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

export const AUTH_SERVICE_PROVIDER = [
  provide(AuthService, {
    useFactory: (): AuthService => {
      return AuthService.getInstance();
    }
  })
];