import {Injectable} from '@angular/core';
import {WindowRef} from '../util/window';
/**
 * Created by alex on 6/6/17.
 */

@Injectable()
export class HostService {
    constructor(private windowRef: WindowRef) {
    }

    fetchUrl(): String {
        return 'http://' + this.windowRef.nativeWindow.location.hostname + ':' + this.windowRef.nativeWindow.location.port + '/';
    }
}
