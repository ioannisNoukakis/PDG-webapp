System.register(['angular2/core', 'angular2/http', './token', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, http_2, token_1;
    var LoginService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (token_1_1) {
                token_1 = token_1_1;
            },
            function (_1) {}],
        execute: function() {
            LoginService = (function () {
                function LoginService(_http) {
                    this._http = _http;
                    // URL to web api
                    this.apiURL = 'https://api.eventail.me/auth/token';
                    this.headers = new http_2.Headers();
                    this.headers.append('Content-Type', 'application/json');
                    this.headers.append('Accept', 'application/json');
                }
                LoginService.prototype.GetToken = function (loginModel) {
                    var _this = this;
                    console.log("[LOGIN_SERVICE] Sending authentification request...");
                    var credentials = JSON.stringify({ mail: loginModel.username, pass: loginModel.password });
                    this._http.post(this.apiURL, credentials, { headers: this.headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.saveJwt(data); }, function (err) { return _this.logError(err); }, function () { return console.log("[LOGIN_SERVICE] Authentication Complete."); });
                };
                LoginService.prototype.saveJwt = function (jwt) {
                    if (jwt) {
                        this.token = new token_1.Token(jwt.token, jwt.string, false);
                        console.log(this.token);
                    }
                };
                LoginService.prototype.logError = function (error) {
                    console.log(error);
                };
                LoginService.prototype.getToken = function () {
                    return this.token;
                };
                LoginService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], LoginService);
                return LoginService;
            }());
            exports_1("LoginService", LoginService);
        }
    }
});
//# sourceMappingURL=login.service.js.map