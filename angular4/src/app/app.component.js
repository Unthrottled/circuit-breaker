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
require("./app.component.htm");
var session_service_1 = require("./session/session.service");
var AppComponent = (function () {
    function AppComponent(sessionService) {
        this.sessionService = sessionService;
        this._backpressureHelp = false;
    }
    Object.defineProperty(AppComponent.prototype, "titleRef", {
        get: function () {
            return require('./assets/images/hystrix-title.png');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "sessionId", {
        get: function () {
            return this.sessionService.fetchSessionId();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "backpressureHelp", {
        get: function () {
            return this._backpressureHelp;
        },
        set: function (value) {
            this._backpressureHelp = value;
        },
        enumerable: true,
        configurable: true
    });
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'angular-application',
        template: require('./app.component.htm')
    }),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map