/**
 * Created by alex on 6/7/17.
 */
import { Component } from '@angular/core';
import './knob.component.htm';


@Component({
    selector: 'knob',
    templateUrl: `./templates/knob.component.htm`,
    styleUrls: []
})
export class KnobCompontent {
    onChange(): void {
        //do things.
    }
    poop = 10;
}