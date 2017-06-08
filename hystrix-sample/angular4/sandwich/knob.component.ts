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
export class KnobCompontent
{
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
    poop = 10;
    style: any =
        {
            stroke: '#dfe3e9', strokeWidth: 3,
            fill: {
                color: '#fefefe', gradientType: "linear",
                gradientStops: [[0, 1], [50, 0.9], [100, 1]]
            }
        };
    marks: any =
        {
            colorRemaining: { color: 'grey', border: 'grey' },
            colorProgress: { color: '#00a4e1', border: '#00a4e1' },
            type: 'line', offset: '71%', thickness: 3, size: '6%',
            majorSize: '9%', majorInterval: 10, minorInterval: 2
        };
    labels: any =
        {
            offset: '88%',
            step: 10,
            visible: true
        };
    progressBar: any =
        {
            style: { fill: '#00a4e1', stroke: 'grey' },
            size: '9%', offset: '60%',
            background: { fill: 'grey', stroke: 'grey' }
        };
    pointer: any =
        {
            type: 'arrow', style: { fill: '#00a4e1', stroke: 'grey' },
            size: '59%', offset: '49%', thickness: 20
        };
}