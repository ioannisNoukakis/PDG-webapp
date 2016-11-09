import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'map-view',
  templateUrl: 'app/mapView/mapView.component.html',
  styleUrls: ['app/mapView/mapView.component.css'],
})
export class MapView {

  private lat: number;
  private lng: number;

  constructor(private _auth: AuthService, private _router: Router){
    console.log(this._auth.getToken());
    if(this._auth.isConnected())
    {
      console.log("[ERROR][MapView] User must be connected to access the mapView. Redirecting to login...");
      this._router.navigateByUrl('/login');
    }

    //localisation
    navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
    }, () => {
        alert('Please use HTML5 enabled browser');
            // TODO: use yahoo API and postcode from DB to get location long & lat fall back for browsers not supporting this call
    }, {
            timeout: 10000,
            maximumAge: 1,
            enableHighAccuracy: true
        }
    );
  }
  username = "User";
}
