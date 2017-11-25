/**
 * Created by alex on 6/7/17.
 */
import {Component, NgZone} from '@angular/core';
import './slider.component.htm';
import {Http} from '@angular/http';
import {SliderImpl} from './slider.implementation';
import {SessionService} from '../session/session.service';


@Component({
    selector: 'latency',
    template: require('./slider.component.htm'),
    styleUrls: []
})
export class LatencyCompontent extends SliderImpl {

    constructor(sessionService: SessionService, http: Http, ngZone: NgZone) {
        super(sessionService, http, ngZone,
            () => '/latency',
            (changedValue: Number, sessionId: String) => {
                return {millisecondsDelay: changedValue, sessionId: sessionId};
            },
            (jsonResponse: any) => jsonResponse.millisecondsDelay,
            300);
    }
}
