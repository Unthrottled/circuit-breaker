import {Injectable} from '@angular/core';
/**
 * Created by alex on 6/6/17.
 */

@Injectable()
export class HostService {
    constructor(private window: Window) {
    }

    getUrl(): String {
        return 'http://' + this.window.location.hostname + ':' + this.window.location.port + '/';
    }
}