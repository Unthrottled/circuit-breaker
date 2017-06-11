/**
 * Created by alex on 6/7/17.
 */
import {Component, Input, NgZone, OnInit} from '@angular/core';
import './slider.component.htm';
import {HostService} from './host.service';
import {SessionService} from './session.service';
import {Http} from '@angular/http';


@Component({
    selector: 'slider',
    templateUrl: `./templates/slider.component.htm`,
    styleUrls: []
})
export class SliderCompontent implements OnInit {
    poop: Number = 10;
    ngOnInit(): void {
        let httpo = this.http;
        let hosto = this.hostService;
        let self = this;
        let zono = self.zone;
        this.sessionService.fetchSessionId()
            .subscribe(function(sessionId){
                httpo.get(hosto.fetchUrl() + 'hystrix/get/' + sessionId + '/throttle')
                    .subscribe(response => {
                        zono.run(()=>self.poop = response.json().requestsPerSecond);
                    });
            });
    }


    constructor(private sessionService: SessionService, private http: Http, private hostService: HostService, private zone: NgZone) {
    }
    change(value: Number): void {
        let httpo = this.http;
        let hosto = this.hostService;
        let self = this;
        let zono = self.zone;
        this.sessionService.fetchSessionId()
            .subscribe(function(sessionId){
                httpo.post(hosto.fetchUrl() + 'hystrix/post/' + sessionId + '/throttle',
                    {requestsPerSecond: value, sessionId: sessionId})
                    .subscribe(response => {
                        zono.run(()=>self.poop = response.json().requestsPerSecond);
                    });
            });
    }
}