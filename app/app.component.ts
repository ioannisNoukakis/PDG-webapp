import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [ AuthService ]
})
export class AppComponent { }