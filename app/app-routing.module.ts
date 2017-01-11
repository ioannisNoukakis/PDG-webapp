import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent }  from './login/login.component';
import { MapView }         from './mapView/mapView.component';
import { FriendComponent } from './friend/friend.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent }    from './admin/admin.component'
import { ProfilComponent }   from './profil/profil.component'

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'mapView', component: MapView },
      { path: 'login', component: LoginComponent },
      { path: 'friends', component: FriendComponent },
      { path: 'register', component: RegisterComponent},
      { path: 'admin', component : AdminComponent},
      { path: 'profil', component : ProfilComponent},
      { path: '', component: LoginComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}