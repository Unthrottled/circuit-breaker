/**
 * Created by alex on 6/6/17.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {HostService} from '../session/host.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishReplay';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class SessionService {
    private sessionIdo = new ReplaySubject(1);

    constructor(private http: Http, private hostService: HostService) {
    }

    fetchSessionId(): Observable<String> {
        if (!this.sessionIdo.observers.length) {
            this.http.get(this.hostService.fetchUrl() + 'hystrix/get/stream-id')
                .map(response => response.json())
                .subscribe(sessionId => this.sessionIdo.next(sessionId));
        }

        return this.sessionIdo;
    }
}
