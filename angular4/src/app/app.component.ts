import {Component} from '@angular/core';
import './app.component.htm';
import {SessionService} from './session/session.service';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'angular-application',
    template: require('./app.component.htm')
})
export class AppComponent {
    private _backpressureHelp: boolean = false;

    constructor(private sessionService: SessionService){

    }

    get titleRef(): string {
        return require('./assets/images/hystrix-title.png');
    }

    get sessionId() : Observable<string> {
        return this.sessionService.fetchSessionId();
    }


    get backpressureHelp(): boolean {
        return this._backpressureHelp;
    }

    set backpressureHelp(value: boolean) {
        this._backpressureHelp = value;
    }
}
