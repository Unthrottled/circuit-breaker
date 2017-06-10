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
var SliderCompontent = (function () {
    function SliderCompontent() {
        this.poop = 10;
        this.change = function () {
            console.log("default");
        };
    }
    return SliderCompontent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SliderCompontent.prototype, "change", void 0);
SliderCompontent = __decorate([
    core_1.Component({
        selector: 'slider',
        templateUrl: "./templates/slider.component.htm",
        styleUrls: []
    })
], SliderCompontent);
exports.SliderCompontent = SliderCompontent;
//# sourceMappingURL=slider.component.js.map