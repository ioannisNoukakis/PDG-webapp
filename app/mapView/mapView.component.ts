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

  private editingPointsOfInterest: boolean = false;

  private markerEvent: MarkerEvent[] = [];
  private commandMakerEvent: MarkerEvent = this.markerEvent[this.markerEvent.length-1];

  private markerPOI: MarkerPOI[] = [];
  private commandMakerPOI: MarkerPOI = this.markerPOI[this.markerPOI.length-1];

  constructor(private _auth: AuthService, private _router: Router, private mapService :MapViewService){

    //localisation
    navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        mapService.getEventNearby(this.lat, this.lng, 2000)
        .subscribe(
          success => 
            {
              success.forEach((element)=>{
                this.markerEvent.push(
                  {
                    id: element.id,
                    owner: element.owner,
                    title: element.title,
                    desc: element.desc,
                    begin: "",
                    end: "",
                    spontaneous: element.spontaneous,
                    location:element.location,
                    radius: element.radius,
                    draggable: this._auth.getUserId() == element.owner
                  }
                );
              });
              this.commandMakerEvent = this.markerEvent[this.markerEvent.length-1];
            },
            error => alert("Error: " + error)
          );
    }, () => {
        alert('Please use HTML5 enabled browser');
    }, {
            timeout: 10000,
            maximumAge: 1,
            enableHighAccuracy: true
        }
    );
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
  
  clickedMarkerEvent(label: string, index: number) {
    this.commandMakerEvent = this.markerEvent[index];
    this.markerPOI = [];
    this.mapService.getPOIs(this.commandMakerEvent.id)
    .subscribe(
      success => 
        {
          success.forEach((element)=>{
            this.markerPOI.push(
              {
                id: element.id,
                event: element.event,
                title: element.title,
                desc: element.desc,
                location: element.location,
                draggable: this._auth.getUserId() == this.commandMakerEvent.owner
              }
            );
          });
          this.commandMakerPOI = this.markerPOI[this.markerPOI.length-1];
        },
        error => alert("Error: " + error)
      );
  }

   clickedMarkerPOI(label: string, index: number) {
      this.commandMakerPOI = this.markerPOI[index];
  }
  
  mapClicked($event: MouseEvent) {
    if(!this.editingPointsOfInterest)
    {
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
      this.commandMakerEvent = this.markerEvent[this.markerEvent.length-1];
    }
    else{
      this.markerPOI.push(
        {
          title: "new point of interest",
          desc: "",
          location:[
            $event.coords.lat,
            $event.coords.lng,
          ],
          draggable: true
        }); 
        this.commandMakerPOI = this.markerPOI[this.markerPOI.length-1];
    }
  }
  
  eventMarkerDragEnd(m: MarkerEvent, $event: MouseEvent) {
      m.location[0] = $event.coords.lat;
      m.location[1] = $event.coords.lng;
  }

  POIMarkerDragEnd(m: MarkerPOI, $event: MouseEvent) {
      m.location[0] = $event.coords.lat;
      m.location[1] = $event.coords.lng;
  }

  deleteMarkerEvent(m: MarkerEvent)
  {
    var index = this.markerEvent.indexOf(m);
    if(index != -1)
    {
      this.markerEvent.splice(index, 1);
    }
  }

  deleteMarkerPOI(m: MarkerPOI)
  {
    var index = this.markerPOI.indexOf(m);
    if(index != -1)
    {
      this.markerPOI.splice(index, 1);
      if(m.id != undefined) //already exists in BDD
      {
        this.mapService.deletePOI(m.event, m.id)
        .subscribe(
          success =>
          {
            alert("Point of interest successfully deleted!");
          },
            error => alert("Error: " + error)
        );
      }
    }
  }

  savePOI(m: MarkerPOI)
  {
    if(this.commandMakerEvent.id == undefined)
    {
      alert("You must first save your event.");
      return;
    }
    let tmp = Object.assign({}, m);
    delete tmp.draggable;

    //si le poi n'existe pas
    if(tmp.id == undefined){
      this.mapService.savePOI(tmp, this.commandMakerEvent.id)
      .subscribe(
        success =>
        {
          m.id = success.id;
          m.event = success.event;
          alert("Point of interest successfully saved!");
        },
          error => alert("Error: " + error)
      );
    }
    else {
      delete tmp.id;
      delete tmp.event;
      this.mapService.updatePOI(tmp, m.event, m.id)
      .subscribe(
        success => alert("Point of interest successfully updated!"),
        error => alert("Error: " + error)
      );
    }
  }

  saveEvent(m: MarkerEvent)
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
        m.owner = success.owner;
        alert("Event successfully saved (id:" + m.id + ").");
      },
      error => alert("Error: " + error)
    );
  }
}

interface MarkerEvent {
    id?: number,
    owner?: number,
    title: string;
    desc: string;
    begin: string;
    end: string;
    spontaneous: boolean;
    location:number[];
    radius: number;
    draggable: boolean;
}

interface MarkerPOI{
    id?: number;
    event?: number;
    title: string;
    desc: string;
    location:number[];
    draggable: boolean;
}

