System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var AuthService, AUTH_SERVICE_PROVIDER;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AuthService = (function () {
                function AuthService() {
                }
                AuthService.getInstance = function () {
                    if (AuthService._instance === null) {
                        AuthService._instance = new AuthService();
                    }
                    return AuthService._instance;
                };
                AuthService.prototype.getToken = function () {
                    return this._token;
                };
                AuthService.prototype.isConnected = function () {
                    if (this._token == null)
                        return false;
                    var time = new Date().getTime() - new Date(this._token.expires).getTime();
                    return time >= 0;
                };
                AuthService._instance = null;
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
            exports_1("AUTH_SERVICE_PROVIDER", AUTH_SERVICE_PROVIDER = [
                core_1.provide(AuthService, {
                    useFactory: function () {
                        return AuthService.getInstance();
                    }
                })
            ]);
        }
    }
});
//# sourceMappingURL=auth.service.js.map