System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Token;
    return {
        setters:[],
        execute: function() {
            Token = (function () {
                function Token(token, expires, extented) {
                    this.token = token;
                    this.expires = expires;
                    this.extented = extented;
                }
                return Token;
            }());
            exports_1("Token", Token);
        }
    }
});
//# sourceMappingURL=token.js.map