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
var SliderCompontent = (function () {
    function SliderCompontent(sessionService, http, hostService, zone) {
        this.sessionService = sessionService;
        this.http = http;
        this.hostService = hostService;
        this.zone = zone;
        this.poop = 10;
    }
    SliderCompontent.prototype.ngOnInit = function () {
        var httpo = this.http;
        var hosto = this.hostService;
        var self = this;
        var zono = self.zone;
        this.sessionService.fetchSessionId()
            .subscribe(function (sessionId) {
            httpo.get(hosto.fetchUrl() + 'hystrix/get/' + sessionId + '/throttle')
                .subscribe(function (response) {
                zono.run(function () { return self.poop = response.json().requestsPerSecond; });
            });
        });
    };
    SliderCompontent.prototype.change = function (value) {
        var httpo = this.http;
        var hosto = this.hostService;
        var self = this;
        var zono = self.zone;
        this.sessionService.fetchSessionId()
            .subscribe(function (sessionId) {
            httpo.post(hosto.fetchUrl() + 'hystrix/post/' + sessionId + '/throttle', { requestsPerSecond: value, sessionId: sessionId })
                .subscribe(function (response) {
                zono.run(function () { return self.poop = response.json().requestsPerSecond; });
            });
        });
    };
    return SliderCompontent;
}());
SliderCompontent = __decorate([
    core_1.Component({
        selector: 'slider',
        templateUrl: "./templates/slider.component.htm",
        styleUrls: []
    }),
    __metadata("design:paramtypes", [session_service_1.SessionService, http_1.Http, host_service_1.HostService, core_1.NgZone])
], SliderCompontent);
exports.SliderCompontent = SliderCompontent;
//# sourceMappingURL=slider.component.js.map