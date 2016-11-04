import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'map-view',
  templateUrl: 'app/mapView/mapView.component.html',
  styleUrls: ['app/mapView/mapView.component.css'],
})
export class MapView {

  constructor(private _auth: AuthService, private _router: Router){
    if(!this._auth.isConnected())
    {
      console.log("[ERROR][MapView] User must be connected to access the mapView. Redirecting to login...");
      this._router.navigateByUrl('/login');
    }
  }

  lat: number = 51.678418;
  lng: number = 7.809007;
}
