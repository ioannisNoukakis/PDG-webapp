import { Component }     from '@angular/core';
import { AuthService }   from '../auth/auth.service'
import { Router }        from '@angular/router'
import { MarkerManager } from 'angular2-google-maps/core'
import { MapViewService } from './mapView.service';

@Component({
  selector: 'map-view',
  templateUrl: './mapView.component.html',
  styleUrls: ['./mapView.component.css'],
  providers: [MapViewService]
})
export class MapView {

  private lat;
  private lng;

  private hbegin : string;
  private hend: string;

  constructor(private _auth: AuthService, private _router: Router, private mapService :MapViewService){

    //localisation
    navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
    }, () => {
        alert('Please use HTML5 enabled browser');
    }, {
            timeout: 10000,
            maximumAge: 1,
            enableHighAccuracy: true
        }
    );

    //mapService.getEventNearby(this.lat, this.lng, 0);
  }

    // google maps zoom level
  zoom: number = 13;

  /*markerPerson: marker[] = [
      {
        lat: 46.7799171,
        lng: 6.6596547,
        label: 'Ioannis Noukakis',
        draggable: false
      }
    ]*/

//TODO REMOVE THIS AND ADD A PROPER NGIF IN TEMPLATE
  markerEvent: marker[] = [
    {
      title: "New event",
      desc: "",
      begin: "",
      end: "",
      spontaneous: false,
      location:[
          46.7799171,
          6.6596547,
      ],
      radius: 500,
      draggable: true
    }
  ];

  commandMaker: marker = this.markerEvent[this.markerEvent.length-1];
  
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
    this.commandMaker = this.markerEvent[index];
  }
  
  mapClicked($event: MouseEvent) {
    this.markerEvent.push({
      title: "New event",
      desc: "",
      begin: "",
      end: "",
      spontaneous: false,
      location:[
          $event.coords.lat,
          $event.coords.lng,
      ],
      radius: 500,
      draggable: true
    });
    this.commandMaker = this.markerEvent[this.markerEvent.length-1];
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    m.location[0] = $event.coords.lat;
    m.location[1] = $event.coords.lng;
  }

  deleteMarker(m: marker)
  {
    var index = this.markerEvent.indexOf(m);
    if(index != -1)
    {
      this.markerEvent.splice(index, 1);
    }
  }

  saveEvent(m: marker)
  {
      let tmp = Object.assign({}, m);
      delete tmp.draggable;
      tmp.begin = new Date(tmp.begin + " " + this.hbegin).toISOString();
      tmp.end = new Date(tmp.end + " " + this.hend).toISOString();
      this.mapService.saveEvent(tmp)
      .subscribe(
        success => 
        {
          m.id = success.id;
          alert("Event successfully saved (id:" + m.id + ")");
        },
        error => alert("Error: " + error)
      );
  }
}
// just an interface for type safety.
interface marker {
    id?: number,
    title: string;
    desc: string;
    begin: string;
    end: string;
    spontaneous: boolean;
    location:number[];
    radius: number;
    draggable: boolean;
}

