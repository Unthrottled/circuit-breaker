/**
 * Created by alex on 6/6/17.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/add/operator/toPromise'
import {HostService} from './host.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class SessionService{
    constructor(private http: Http, private hostService: HostService){}

    fetchSessionId(): Observable<String> {
        return this.http.get(this.hostService.fetchUrl() + 'get/stream-id')
            .map(response => response.json().data)
            .share()
            .publishReplay(1);
    }
}