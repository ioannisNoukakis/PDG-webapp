"use strict";
var Token = (function () {
    function Token(token, expires, extented) {
        this.token = token;
        this.expires = expires;
        this.extented = extented;
    }
    return Token;
}());
exports.Token = Token;
//# sourceMappingURL=token.js.map