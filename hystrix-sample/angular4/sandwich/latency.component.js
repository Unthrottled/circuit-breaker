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
/**
 * Created by alex on 6/7/17.
 */
var core_1 = require("@angular/core");
require("./slider.component.htm");
var host_service_1 = require("./host.service");
var session_service_1 = require("./session.service");
var http_1 = require("@angular/http");
var LatencyCompontent = (function () {
    function LatencyCompontent(sessionService, http, hostService, zone) {
        this.sessionService = sessionService;
        this.http = http;
        this.hostService = hostService;
        this.zone = zone;
        this.poop = 10;
        this.someRange2config = {
            behaviour: 'drag',
            connect: true,
            margin: 100,
            range: {
                min: 1,
                max: 1000
            }
        };
    }
    LatencyCompontent.prototype.ngOnInit = function () {
        var httpo = this.http;
        var hosto = this.hostService;
        var self = this;
        var zono = self.zone;
        this.sessionService.fetchSessionId()
            .subscribe(function (sessionId) {
            httpo.get(hosto.fetchUrl() + 'hystrix/get/' + sessionId + '/latency')
                .subscribe(function (response) {
                zono.run(function () { return self.poop = response.json().millisecondsDelay; });
            });
        });
    };
    LatencyCompontent.prototype.change = function (value) {
        var httpo = this.http;
        var hosto = this.hostService;
        var self = this;
        var zono = self.zone;
        this.sessionService.fetchSessionId()
            .subscribe(function (sessionId) {
            httpo.post(hosto.fetchUrl() + 'hystrix/post/' + sessionId + '/latency', { millisecondsDelay: value, sessionId: sessionId })
                .subscribe(function (response) {
                zono.run(function () { return self.poop = response.json().millisecondsDelay; });
            });
        });
    };
    return LatencyCompontent;
}());
LatencyCompontent = __decorate([
    core_1.Component({
        selector: 'latency',
        templateUrl: "./templates/slider.component.htm",
        styleUrls: []
    }),
    __metadata("design:paramtypes", [session_service_1.SessionService, http_1.Http, host_service_1.HostService, core_1.NgZone])
], LatencyCompontent);
exports.LatencyCompontent = LatencyCompontent;
//# sourceMappingURL=latency.component.js.map