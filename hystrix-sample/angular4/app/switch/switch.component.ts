/**
 * Created by alex on 6/7/17.
 */
import {Component, NgZone, OnInit} from '@angular/core';
import './switch.component.htm';
import {Http} from '@angular/http';
import {SessionService} from '../session/session.service';
import {HostService} from '../session/host.service';


@Component({
    selector: 'dead-mans-switch',
    templateUrl: `./templates/switch.component.htm`,
    styleUrls: []
})
export class SwitchComponent implements OnInit {
    liveness: Boolean = true;

    ngOnInit(): void {
        let httpo = this.http;
        let hosto = this.hostService;
        let self = this;
        let zono = self.zone;
        this.sessionService.fetchSessionId()
            .subscribe(function (sessionId) {
                httpo.get(hosto.fetchUrl() + 'hystrix/get/' + sessionId + '/liveness')
                    .subscribe(response => {
                        zono.run(() => self.liveness = response.json().serviceAlive);
                    });
            });
    }


    constructor(private sessionService: SessionService, private http: Http, private hostService: HostService, private zone: NgZone) {
    }

    change(value: any): void {
        let httpo = this.http;
        let hosto = this.hostService;
        let self = this;
        let zono = self.zone;
        this.sessionService.fetchSessionId()
            .subscribe(function (sessionId) {
                httpo.post(hosto.fetchUrl() + 'hystrix/post/' + sessionId + '/liveness',
                    {serviceAlive: value, sessionId: sessionId})
                    .subscribe(response => {
                        zono.run(() => self.liveness = response.json().serviceAlive);
                    });
            });
    }
}
