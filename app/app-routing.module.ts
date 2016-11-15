import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent }  from './login/login.component';
import { MapView }         from './mapView/mapView.component';
import { FriendComponent } from './friend/friend.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'mapView', component: MapView },
      { path: 'login', component: LoginComponent },
      { path: 'friends', component: FriendComponent },
      { path: '', component: LoginComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}