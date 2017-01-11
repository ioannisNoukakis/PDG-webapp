import { Component }     from '@angular/core';
import { AuthService }   from '../auth/auth.service'
import { Router }        from '@angular/router'
import { MarkerManager } from 'angular2-google-maps/core'
import { MapViewService } from './mapView.service';
import { UserService }   from '../user/user.service'

/**
 * class for the MapView component.
 */
@Component({
  selector: 'map-view',
  templateUrl: './mapView.component.html',
  styleUrls: ['./mapView.component.css'],
  providers: [MapViewService]
})
export class MapView {

  private lat;
  private lng;
  private radius;

  private editingPointsOfInterest: boolean = false;

  private markerEvent: MarkerEvent[] = [];
  private commandMakerEvent: MarkerEvent = null;

  private markerPOI: MarkerPOI[] = [];
  private commandMakerPOI: MarkerPOI = this.markerPOI[this.markerPOI.length-1];

  private markerPerson: MarkerPerson[] = [];

  private zoom: number = 15;

  /**
   * constructor
   */
  constructor(private _auth: AuthService, private _router: Router, private mapService :MapViewService, private userService:UserService){
    this.loadElements();
    this.radius = 2000;
    setInterval(e=> {
      this.loadPersons();
    }, 5000);
  }

  /**
   * Load the elements to be displayed on the map.
   */
  private loadElements()
  {
    this.markerEvent = [];
    this.markerPOI = [];
    this.markerPerson = [];
     //localisation
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.loadMapElements();
    }, () => {
        alert('Please use HTML5 enabled browser');
    }, {
            timeout: 10000,
            maximumAge: 1,
            enableHighAccuracy: true
        }
    );
  }

  /**
   * Load the persons (the markers of persons) to be displayed on the map.
   */
  private loadPersons()
  {
    this.markerPerson = [];
    this.userService.getUsersNearby(this.lat, this.lng, this.radius, false)
          .subscribe(
            success =>{
              success.forEach((user) =>
              {
                this.markerPerson.push(
                  {
                    id: user.id,
                    title: user.username,
                    location: user.location
                  }
                );
              });
            },
            error => alert("Error: " + error)
          );
  }

  /**
   * Load the events to be displayed on the map.
   */
  private loadMapElements()
  {
        this.radius = 3333*(21-this.zoom);
        this.markerEvent = [];
        if(this.lat != undefined)
        {
        this.mapService.getEventNearby(this.lat, this.lng, this.radius)
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
                    begin: new Date(element.begin).toISOString().substring(0, 10),
                    end: new Date(element.end).toISOString().substring(0, 10),
                    hbegin: new Date(element.begin).toISOString().substring(11, 16),
                    hend: new Date(element.end).toISOString().substring(11, 16),
                    spontaneous: element.spontaneous,
                    location:element.location,
                    radius: element.radius,
                    draggable: this._auth.getUserId() == element.owner
                  }
                );
              });
            },
            error => alert("Error: " + error)
          );
        }
  }

  /**
   * Event fired form the template when a marker event has been clicked.
   * Loads all the points of interest of this event.
   */
  clickedMarkerEvent(label: string, index: number) {
    this.commandMakerEvent = this.markerEvent[index];
    if(this.commandMakerEvent.id == undefined)
      return;

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

      this.mapService.getFriendsNearby(this.commandMakerEvent.location[0],
                                       this.commandMakerEvent.location[1],
                                       this.commandMakerEvent.radius)
      .subscribe(
        success => {
          success.forEach((element)=>{
            this.markerPerson.push(
              {
                id: element.id,
                title: element.username,
                location: element.location
              }
            );
          });
        },
        error => alert("Error: " + error)
      );
  }

  /**
   * Event fired form the template when a marker points of interest has been clicked.
   */
   clickedMarkerPOI(label: string, index: number) {
      this.commandMakerPOI = this.markerPOI[index];
  }
  
  mapClicked($event: MouseEvent) {
    if(!this.editingPointsOfInterest)
    {
      this.markerEvent.push({
        title: "New event",
        desc: "",
        begin: new Date().toISOString().substring(0, 10),
        end: new Date().toISOString().substring(0, 10),
        hbegin: new Date().toISOString().substring(11, 16),
        hend: new Date().toISOString().substring(11, 16),
        spontaneous: false,
        location:[
            $event.coords.lat,
            $event.coords.lng,
        ],
        radius: 10,
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

  /**
   * Event fired form the template when the google map center has changed.
   */
  centerMapChanged($event){
    this.lat = $event.lat;
    this.lng = $event.lng;
  }

   /**
   * Event fired form the template when the google map has cessed to move.
   */
  mapIdle()
  {
    this.loadMapElements();
    if(this.commandMakerEvent != null)
    {
      if(this.commandMakerEvent.id == undefined)
      {
        this.markerEvent.push(this.commandMakerEvent);
        return;
      }
    }
  }

   /**
   * Event fired form the template when the google map zoom has changed.
   */
  zoomChanged($event)
  {
    this.zoom = $event;
  }
  
   /**
   * Event fired form the template when a event marker was beeing draged and has been released.
   */
  eventMarkerDragEnd(m: MarkerEvent, $event: MouseEvent) {
      m.location[0] = $event.coords.lat;
      m.location[1] = $event.coords.lng;
  }

   /**
   * Event fired form the template when a point of interest marker was beeing draged and has been released.
   */
  POIMarkerDragEnd(m: MarkerPOI, $event: MouseEvent) {
      m.location[0] = $event.coords.lat;
      m.location[1] = $event.coords.lng;
  }

  /**
   * Delete in the API and in the template this event.
   */
  deleteMarkerEvent(m: MarkerEvent)
  {
    var index = this.markerEvent.indexOf(m);
    if(index != -1)
    {
      this.markerPOI.forEach((element) =>
      {
        this.mapService.deletePOI(m.id, element.id);
      });
      this.markerPOI = [];
      this.markerEvent.splice(index, 1);
      this.commandMakerEvent = null;
      if(m.id != undefined)
      {
        this.mapService.deleteEvent(m.id)
        .subscribe(
          success => alert("Event successfully deleted!"),
          error => alert("Error: " + error)
        );
      }
    }
  }

  /**
   * Delete in the API and in the template this point of interest.
   */
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
          success => alert("Point of interest successfully deleted!"),
          error => alert("Error: " + error)
        );
      }
    }
  }

  /**
   * Saves in the API and in the template this point of interest.
   * If this point of interest already existed in the API, updates it.
   */
  savePOI(m: MarkerPOI, doAlert: boolean)
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
          if(doAlert)
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
        success => 
        {
          if(doAlert)
            alert("Point of interest successfully updated!")
        },
        error => alert("Error: " + error)
      );
    }
  }

  /**
   * Saves in the API and in the template this event.
   * If this event already existed in the API, updates it.
   */
  saveEvent(m: MarkerEvent)
  {
    let tmp = Object.assign({}, m);
    delete tmp.draggable;
    tmp.begin = new Date(tmp.begin + " " + this.commandMakerEvent.hbegin).toISOString();
    tmp.end = new Date(tmp.end + " " + this.commandMakerEvent.hend).toISOString();

    if(m.id == undefined){ //if the event dosen't exists
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
    else{
      this.mapService.updateEvent(tmp, tmp.id)
      .subscribe(
        success => alert("Event successfully updated."),
        error => alert("Error: " + error)
      );
      this.markerPOI.forEach((element) =>{
        this.savePOI(element, false);
      });
    }
  }
}

interface MarkerEvent {
    id?: number,
    owner?: number,
    title: string;
    desc: string;
    begin: string;
    end: string;
    hbegin: string;
    hend: string;
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

interface MarkerPerson{
    id: number,
    title: string,
    location: number[]
}

