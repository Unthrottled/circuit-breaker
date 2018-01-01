"use strict";
/**
 * Created by alex on 6/6/17.
 */
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
var message_service_1 = require("./message.service");
var Observable_1 = require("rxjs/Observable");
var MessageComponent = /** @class */ (function () {
    function MessageComponent(messageService, zone) {
        this.messageService = messageService;
        this.zone = zone;
        this.messages = [];
        this.messagesPerSecond = 0;
        this.messagesRecieved = [];
        var self = this;
        Observable_1.Observable.interval(1000)
            .subscribe(function (int) {
            self.zone.run(function () {
                self.messagesPerSecond = self.messagesRecieved.length;
                self.messagesRecieved = [];
            });
        });
    }
    MessageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.fetchMessages().subscribe(function (message) {
            _this.zone.run(function () {
                if (_this.messages.length > 15) {
                    _this.messages.shift();
                }
                _this.messagesRecieved.push(message);
                _this.messages.push(message);
            });
        });
    };
    MessageComponent = __decorate([
        core_1.Component({
            selector: 'message-ticker',
            template: require('./MessageComponent.htm')
        }),
        __metadata("design:paramtypes", [message_service_1.MessageService, core_1.NgZone])
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;
//# sourceMappingURL=message.component.js.map