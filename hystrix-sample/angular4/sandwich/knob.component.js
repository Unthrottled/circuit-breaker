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
        // ngAfterViewInit(): void
        // {
        //
        // }
        // onChange(event: any): void
        // {
        // {
        //     event.stopPropagation();
        //     // if (event.args.changeSource == 'propertyChange' || event.args.changeSource == 'val') { return; }
        //     // this.numberInput.val(event.args.value);
        // }
        // onMouseDown(event: any): void
        // }
        // onKeyup(): void
        // {
        // }
        // onValueChanged(): void
        // {
        // }
        this.poop = 10;
        this.style = {
            stroke: '#dfe3e9', strokeWidth: 3,
            fill: {
                color: '#fefefe', gradientType: "linear",
                gradientStops: [[0, 1], [50, 0.9], [100, 1]]
            }
        };
        this.marks = {
            colorRemaining: { color: 'grey', border: 'grey' },
            colorProgress: { color: '#00a4e1', border: '#00a4e1' },
            type: 'line', offset: '71%', thickness: 3, size: '6%',
            majorSize: '9%', majorInterval: 10, minorInterval: 2
        };
        this.labels = {
            offset: '88%',
            step: 10,
            visible: true
        };
        this.progressBar = {
            style: { fill: '#00a4e1', stroke: 'grey' },
            size: '9%', offset: '60%',
            background: { fill: 'grey', stroke: 'grey' }
        };
        this.pointer = {
            type: 'arrow', style: { fill: '#00a4e1', stroke: 'grey' },
            size: '59%', offset: '49%', thickness: 20
        };
    }
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