/**
 * Created by alex on 6/6/17.
 */
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
var message_service_1 = require("./message.service");
var MessageComponent = (function () {
    function MessageComponent(messageService) {
        this.messageService = messageService;
    }
    MessageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.fetchMessages().subscribe(function (message) {
            if (_this.messages.length > 20) {
                _this.messages.shift();
            }
            else {
                _this.messages.push(message);
            }
        });
    };
    return MessageComponent;
}());
MessageComponent = __decorate([
    core_1.Component({
        selector: 'message-ticker',
        template: "\n            <ul>\n                <li *ngFor=\"let message of messages\">\n                    <span>{{message}}</span>\n                </li>\n            </ul>\n    "
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageComponent);
exports.MessageComponent = MessageComponent;
//# sourceMappingURL=message.component.js.map