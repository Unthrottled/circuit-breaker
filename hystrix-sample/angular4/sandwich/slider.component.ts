/**
 * Created by alex on 6/7/17.
 */
import {Component, Input} from '@angular/core';
import './slider.component.htm';


@Component({
    selector: 'slider',
    templateUrl: `./templates/slider.component.htm`,
    styleUrls: []
})
export class SliderCompontent {

    poop = 10;
    @Input()change =  function () {
        console.log("default");
    };
}