"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var auth_service_1 = require('../auth/auth.service');
var router_1 = require('@angular/router');
var MapView = (function () {
    function MapView(_auth, _router) {
        this._auth = _auth;
        this._router = _router;
        this.lat = 51.678418;
        this.lng = 7.809007;
        if (!this._auth.isConnected()) {
            console.log("[ERROR][MapView] User must be connected to access the mapView. Redirecting to login...");
            this._router.navigateByUrl('/login');
        }
    }
    MapView = __decorate([
        core_1.Component({
            selector: 'map-view',
            templateUrl: 'app/mapView/mapView.component.html',
            styleUrls: ['app/mapView/mapView.component.css'],
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], MapView);
    return MapView;
}());
exports.MapView = MapView;
//# sourceMappingURL=mapView.component.js.map