/// <reference path="../util/EventSource.d.ts"/>
import {Injectable} from '@angular/core';
import {SessionService} from '../session/session.service';
import {Observable} from 'rxjs/Observable';
import {HostService} from '../session/host.service';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/mergeMap';
import {Message} from './message';

@Injectable()
export class MessageService {
    constructor(private sessionService: SessionService, private hostService: HostService) {
    }

    fetchMessages(): Observable<Message> {
        return this.sessionService.fetchSessionId()
            .flatMap(sessionId => {
                return Observable.create((observer: Observer<Message>) => {
                    let eventSource = new EventSource(this.hostService.fetchUrl() + 'hystrix/' + sessionId + '/test.stream');
                    eventSource.onmessage = x => {
                        observer.next(new Message(x.data));
                    };
                    eventSource.onerror = x => observer.error(console.log('EventSource failed ' + x));
                    return () => {
                    };
                });
            });
    }
}
