"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by alex on 6/7/17.
 */
var core_1 = require("@angular/core");
require("./knob.component.htm");
var KnobCompontent = (function () {
    function KnobCompontent() {
        this.poop = 10;
    }
    KnobCompontent.prototype.onChange = function () {
        //do things.
    };
    return KnobCompontent;
}());
KnobCompontent = __decorate([
    core_1.Component({
        selector: 'knob',
        templateUrl: "./templates/knob.component.htm",
        styleUrls: []
    })
], KnobCompontent);
exports.KnobCompontent = KnobCompontent;
//# sourceMappingURL=knob.component.js.map