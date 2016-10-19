import { bootstrap }    from 'angular2/platform/browser'
import { AppComponent } from './app.component'
import { HTTP_PROVIDERS, Http } from 'angular2/http';
import {AUTH_SERVICE_PROVIDER, AuthService } from './auth.service'

bootstrap(AppComponent, [HTTP_PROVIDERS, AUTH_SERVICE_PROVIDER]);