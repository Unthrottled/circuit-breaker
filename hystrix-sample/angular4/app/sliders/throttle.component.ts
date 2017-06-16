/**
 * Created by alex on 6/14/17.
 */
import {Component, NgZone} from '@angular/core';
import './slider.component.htm';
import {HostService} from '../session/host.service';
import {SessionService} from '../session/session.service';
import {Http} from '@angular/http';
import {SliderImpl} from './slider.implementation';


@Component({
    selector: 'throttle',
    templateUrl: `./templates/slider.component.htm`,
    styleUrls: []
})
export class ThrottleComponent extends SliderImpl {

    constructor(private sessionService2: SessionService, private http2: Http, private hostService2: HostService, private zone2: NgZone) {
        super(sessionService2, http2, hostService2, zone2,
            () => '/throttle',
            (changedValue: Number, sessionId: String) => {
                return {requestsPerSecond: changedValue, sessionId: sessionId};
            },
            (jsonResponse: any) => jsonResponse.requestsPerSecond,
            100);
    }
}
