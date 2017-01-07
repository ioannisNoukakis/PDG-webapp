import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { FormsModule }       from '@angular/forms';
import { RouterModule }      from '@angular/router';
import { AppComponent }      from './app.component';
import { HttpModule }        from '@angular/http';
import { AgmCoreModule }     from 'angular2-google-maps/core';
import { NgbModule }           from '@ng-bootstrap/ng-bootstrap';

import { AuthService }       from './auth/auth.service';
import { AppRoutingModule }  from './app-routing.module';
import { HTTPService }       from './http/http.service'

import { LoginComponent }    from './login/login.component';
import { MapView }           from './mapView/mapView.component';
import { FriendComponent }   from './friend/friend.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBQGER7XA94yf212XPCMjjVoe9Wl-ZTRzI'
    }),
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    MapView,
    FriendComponent
  ],
  providers:[ AuthService, HTTPService],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
