/**
 * Created by alex on 6/14/17.
 */
import {Component, NgZone} from '@angular/core';
import './slider.component.htm';
import {SessionService} from '../session/session.service';
import {Http} from '@angular/http';
import {SliderImpl} from './slider.implementation';


@Component({
    selector: 'throttle',
    template: require('./slider.component.htm'),
    styleUrls: []
})
export class ThrottleComponent extends SliderImpl {

    constructor(sessionService: SessionService, http: Http, zone: NgZone) {
        super(sessionService, http, zone,
            () => '/throttle',
            (changedValue: Number, sessionId: String) => {
                return {requestsPerSecond: changedValue, sessionId: sessionId};
            },
            (jsonResponse: any) => jsonResponse.requestsPerSecond,
            20);
    }
}
