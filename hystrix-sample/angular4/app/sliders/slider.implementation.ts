/**
 * Created by alex on 6/15/17.
 */
import {NgZone, OnInit} from '@angular/core';
import './slider.component.htm';
import {HostService} from '../session/host.service';
import {SessionService} from '../session/session.service';
import {Http} from '@angular/http';
import {Supplier} from '../util/supplier';
import {BinaryFunction} from '../util/binaryfunction';
import {UnaryOperator} from '../util/UnaryOperator';

export class SliderImpl implements OnInit {
    sliderValue: Number = 10;
    someRange2config: any = {
        behaviour: 'drag',
        connect: true,
        margin: 100,
        range: {
            min: 1,
            max: 1000
        }
    };

    constructor(private sessionService: SessionService, private http: Http,
                private hostService: HostService, private zone: NgZone,
                private urlSupplier: Supplier<String>, private parametersOperator: BinaryFunction<Number, String, any>,
                private responseOperator: UnaryOperator<any>) {
    }


    ngOnInit(): void {
        let self = this;
        this.sessionService.fetchSessionId()
            .subscribe(function (sessionId) {
                self.http.get(self.hostService.fetchUrl() + 'hystrix/get/' + sessionId + self.urlSupplier())
                    .subscribe(response => {
                        self.zone.run(() => self.sliderValue = self.responseOperator.apply(response.json()));
                    });
            });
    }

    change(newValue: Number): void {
        let self = this;
        this.sessionService.fetchSessionId()
            .subscribe(function (sessionId) {
                self.http.post(self.hostService.fetchUrl() + 'hystrix/post/' + sessionId + '/latency',
                    self.parametersOperator.apply(newValue, sessionId))
                    .subscribe(response => {
                        self.zone.run(() => self.sliderValue = self.responseOperator.apply(response.json()));
                    });
            });
    }
}
