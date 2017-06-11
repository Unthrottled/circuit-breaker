/**
 * Created by alex on 6/7/17.
 */
import {Component, Input} from '@angular/core';
import './slider.component.htm';
import {HostService} from './host.service';
import {SessionService} from './session.service';
import {Http} from '@angular/http';


@Component({
    selector: 'slider',
    templateUrl: `./templates/slider.component.htm`,
    styleUrls: []
})
export class SliderCompontent {
    constructor(private sessionService: SessionService, private http: Http, private hostService: HostService) {
    }


    poop = 10;
    change(value: Number): void {
        let httpo = this.http;
        let hosto = this.hostService;
        this.sessionService.fetchSessionId()
            .subscribe(function(sessionId){
                httpo.post(hosto.fetchUrl() + 'hystrix/post/' + sessionId + '/throttle',
                    {requestsPerSecond: value, sessionId: sessionId})
                    .subscribe(response => {
                        response.json();
                    });
            });
    }
}