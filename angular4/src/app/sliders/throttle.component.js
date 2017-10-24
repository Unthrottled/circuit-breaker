"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * Created by alex on 6/14/17.
 */
var core_1 = require("@angular/core");
require("./slider.component.htm");
var host_service_1 = require("../session/host.service");
var session_service_1 = require("../session/session.service");
var http_1 = require("@angular/http");
var slider_implementation_1 = require("./slider.implementation");
var ThrottleComponent = (function (_super) {
    __extends(ThrottleComponent, _super);
    function ThrottleComponent(sessionService2, http2, hostService2, zone2) {
        var _this = _super.call(this, sessionService2, http2, hostService2, zone2, function () { return '/throttle'; }, function (changedValue, sessionId) {
            return { requestsPerSecond: changedValue, sessionId: sessionId };
        }, function (jsonResponse) { return jsonResponse.requestsPerSecond; }, 100) || this;
        _this.sessionService2 = sessionService2;
        _this.http2 = http2;
        _this.hostService2 = hostService2;
        _this.zone2 = zone2;
        return _this;
    }
    return ThrottleComponent;
}(slider_implementation_1.SliderImpl));
ThrottleComponent = __decorate([
    core_1.Component({
        selector: 'throttle',
        templateUrl: "./templates/slider.component.htm",
        styleUrls: []
    }),
    __metadata("design:paramtypes", [session_service_1.SessionService, http_1.Http, host_service_1.HostService, core_1.NgZone])
], ThrottleComponent);
exports.ThrottleComponent = ThrottleComponent;
//# sourceMappingURL=throttle.component.js.map