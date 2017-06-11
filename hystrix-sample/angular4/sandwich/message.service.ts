/// <reference path="./EventSource.d.ts"/>
import {Injectable} from '@angular/core';
import {SessionService} from './session.service';
import {Observable} from 'rxjs/Observable';
import {HostService} from './host.service';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/mergeMap';
/**
 * Created by alex on 6/6/17.
 */

@Injectable()
export class MessageService {
    constructor(private sessionService: SessionService, private hostService: HostService) {
    }

    fetchMessages(): Observable<String> {
        return this.sessionService.fetchSessionId()
            .mergeMap(sessionId => {
                return Observable.create((observer: Observer<String>) => {
                    let eventSource = new EventSource(this.hostService.fetchUrl() + 'hystrix/' + sessionId + '/test.stream');
                    eventSource.onmessage = x => observer.next(x.data);
                    eventSource.onerror = x => observer.error(console.log('EventSource failed ' + x));
                    return () => eventSource.close();
                });
            })
    }
}