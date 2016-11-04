import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent }  from './login/login.component';
import { MapView }         from './mapView/mapView.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'mapView', component: MapView },
      { path: 'login', component: LoginComponent },
      { path: '', component: LoginComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}