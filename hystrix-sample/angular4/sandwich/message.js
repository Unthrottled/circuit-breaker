"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by alex on 6/13/17.
 */
var Message = (function () {
    function Message(msg) {
        this.msg = msg;
        this.success = false;
        this.message = msg;
        this.success = Message.didSucced(this.message);
    }
    Message.didSucced = function (msg) {
        return msg.indexOf('Succeeded') >= 0;
    };
    Message.prototype.getMessage = function () {
        return this.message;
    };
    Message.prototype.isSuccess = function () {
        return this.success;
    };
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=message.js.map