import { Component } from '@angular/core';
import { PagesModel } from './pages.model'

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent { 
  pages: PagesModel[] = [
    new PagesModel("login", "Login"), 
    new PagesModel("mapView", "GoogleMap"),
    new PagesModel("friends", "Friends"),
    ];
}