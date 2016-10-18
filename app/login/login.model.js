System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LoginModel;
    return {
        setters:[],
        execute: function() {
            LoginModel = (function () {
                function LoginModel(username, password) {
                    this.username = username;
                    this.password = password;
                }
                return LoginModel;
            }());
            exports_1("LoginModel", LoginModel);
        }
    }
});
//# sourceMappingURL=login.model.js.map