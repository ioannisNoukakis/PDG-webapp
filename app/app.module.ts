import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}       from '@angular/forms';
import { RouterModule }      from '@angular/router';
import { AppComponent }      from './app.component';
import { HttpModule }        from '@angular/http';
import { AgmCoreModule }     from 'angular2-google-maps/core';
import { NgbModule }           from '@ng-bootstrap/ng-bootstrap';

import { AuthService }       from './auth/auth.service';
import { AppRoutingModule }  from './app-routing.module';
import { HTTPService }       from './http/http.service';
import { UserService }       from './user/user.service'

import { LoginComponent }    from './login/login.component';
import { MapView }           from './mapView/mapView.component';
import { FriendComponent }   from './friend/friend.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent }    from './admin/admin.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    FriendComponent,
    RegisterComponent,
    AdminComponent
  ],
  providers:[ AuthService, HTTPService, UserService],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
