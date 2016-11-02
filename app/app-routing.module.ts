import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent }  from './login/login.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: '', component: LoginComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}