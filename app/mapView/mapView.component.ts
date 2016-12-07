import { Component }     from '@angular/core';
import { AuthService }   from '../auth/auth.service'
import { Router }        from '@angular/router'
import { MarkerManager } from 'angular2-google-maps/core'

@Component({
  selector: 'map-view',
  templateUrl: 'app/mapView/mapView.component.html',
  styleUrls: ['app/mapView/mapView.component.css'],
})
export class MapView {

  private lat;
  private lng;

  constructor(private _auth: AuthService, private _router: Router){

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

    // google maps zoom level
  zoom: number = 13;

  markerPerson: marker[] = [
      {
        lat: 46.7799171,
        lng: 6.6596547,
        label: 'Ioannis Noukakis',
        draggable: false
      }
    ]

    markerEvent: marker[] = [
      {
        lat: 46.7799171,
        lng: 6.6594547,
        label: 'Event A',
        radius: 500, 
        draggable: true
      }
    ]

  commandMaker: marker = this.markerEvent[this.markerEvent.length-1];
  
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
    this.commandMaker = this.markerEvent[index];
  }
  
  mapClicked($event: MouseEvent) {
    this.markerEvent.push({
      lat: 1,//$event.coords.lat,
      lng: 1,//$event.coords.lng,
      label: "New event",
      radius: 500,
      draggable: true
    });
    this.commandMaker = this.markerEvent[this.markerEvent.length-1];
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    m.lat = 1,//$event.coords.lat;
    m.lng = 1,//$event.coords.lng;
    console.log('dragEnd', m, $event);
  }

  deleteMarker(m: marker)
  {
    var index = this.markerEvent.indexOf(m);
    if(index != -1)
    {
      this.markerEvent.splice(index, 1);
    }
  }
}
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
  radius?: number,
	draggable: boolean;
}

