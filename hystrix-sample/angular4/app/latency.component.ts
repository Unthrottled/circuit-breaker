/**
 * Created by alex on 6/7/17.
 */
import {Component, NgZone} from '@angular/core';
import './slider.component.htm';
import {HostService} from './host.service';
import {SessionService} from './session.service';
import {Http} from '@angular/http';
import {SliderImpl} from './slider.implementation';


@Component({
    selector: 'latency',
    templateUrl: `./templates/slider.component.htm`,
    styleUrls: []
})
export class LatencyCompontent extends SliderImpl {

    constructor(private sessionService2: SessionService, private http2: Http, private hostService2: HostService, private ngZone: NgZone) {
        super(sessionService2, http2, hostService2, ngZone,
            () => '/latency',
            (changedValue: Number, sessionId: String) => {
                return {millisecondsDelay: changedValue, sessionId: sessionId};
            },
            (jsonResponse: any) => jsonResponse.millisecondsDelay);
    }
}
