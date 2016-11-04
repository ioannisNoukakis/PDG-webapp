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
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
var token_1 = require('./token');
require('rxjs/add/operator/map');
var auth_service_1 = require('../auth/auth.service');
var LoginService = (function () {
    function LoginService(_http, _auth) {
        this._http = _http;
        this._auth = _auth;
        // URL to web api
        this.apiURL = 'https://api.eventail.me/auth/token';
        this.headers = new http_2.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this._auth = _auth;
    }
    LoginService.prototype.requestToken = function (loginModel) {
        var _this = this;
        console.log("[LOGIN_SERVICE] Sending authentification request...");
        var credentials = JSON.stringify({ mail: loginModel.username, pass: loginModel.password });
        this._http.post(this.apiURL, credentials, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.saveJwt(data); }, function (err) { return _this.logError(err); }, function () { return console.log("[LOGIN_SERVICE] Authentication Complete."); });
    };
    LoginService.prototype.saveJwt = function (jwt) {
        if (jwt) {
            this._auth.setToken(new token_1.Token(jwt.token, jwt.string, false));
            console.log(this._auth.getToken());
        }
    };
    LoginService.prototype.logError = function (error) {
        console.log(error);
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map