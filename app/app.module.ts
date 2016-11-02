import { NgModule }        from '@angular/core';
import { BrowserModule }   from '@angular/platform-browser';
import { FormsModule }     from '@angular/forms';
import { RouterModule }    from '@angular/router';
import { AppComponent }    from './app.component';
import { HttpModule }      from '@angular/http';

import { AppRoutingModule }  from './app-routing.module';

import { LoginComponent }    from './login/login.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
