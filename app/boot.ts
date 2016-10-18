import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {HTTP_PROVIDERS, Http} from 'angular2/http';

bootstrap(AppComponent, [HTTP_PROVIDERS]);