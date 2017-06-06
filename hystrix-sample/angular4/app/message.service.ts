import {Injectable} from '@angular/core';
import {SessionService} from './session.service';
import {Observable} from 'rxjs/Observable';
import {HostService} from './host.service';
import * as EventSource from 'eventsource';
/**
 * Created by alex on 6/6/17.
 */

@Injectable()
export class MessageService {
    constructor(private sessionService: SessionService, private hostService: HostService) {
    }

    getMessages(): Observable<String> {
        return this.sessionService.fetchSessionId()
            .flatMap(sessionId => {
                return Observable.create(observer => {
                    let eventSource = new EventSource(this.hostService.fetchUrl() + sessionId + '/test.stream');
                    eventSource.onmessage = x => observer.next(x.data);
                    eventSource.onerror = x => observer.error(console.log('EventSource failed ' + x));
                    return () => eventSource.close();
                });
            })
    }
}