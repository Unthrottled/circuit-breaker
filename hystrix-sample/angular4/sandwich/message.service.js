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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var session_service_1 = require("./session.service");
var Observable_1 = require("rxjs/Observable");
var host_service_1 = require("./host.service");
require("rxjs/add/operator/mergeMap");
// import  EventSource from 'eventsource';
/**
 * Created by alex on 6/6/17.
 */
var MessageService = (function () {
    function MessageService(sessionService, hostService) {
        this.sessionService = sessionService;
        this.hostService = hostService;
    }
    MessageService.prototype.fetchMessages = function () {
        return this.sessionService.fetchSessionId()
            .mergeMap(function (sessionId) {
            return Observable_1.Observable.create(function (observer) {
                // let eventSource = new EventSource(this.hostService.fetchUrl() + sessionId + '/test.stream');
                // eventSource.onmessage = x => observer.next(x.data);
                // eventSource.onerror = x => observer.error(console.log('EventSource failed ' + x));
                // return () => eventSource.close();
                return function () { return observer.next("poop"); };
            });
        });
    };
    return MessageService;
}());
MessageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [session_service_1.SessionService, host_service_1.HostService])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map