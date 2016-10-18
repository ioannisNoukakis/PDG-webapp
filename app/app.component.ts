import {Component} from 'angular2/core';
import {LoginComponent} from './login/login.component'

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1><login></login>',
    directives: [LoginComponent]
})
export class AppComponent { }