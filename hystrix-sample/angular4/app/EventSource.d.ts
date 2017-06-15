/**
 * Created by alex on 6/10/17.
 */

interface Callback { (data: DooDad): void;
}

interface DooDad { data: String;
}

declare class EventSource {
    onmessage: Callback;
    onerror: Callback;
    close: () => {};

    addEventListener(event: string, cb: Callback): void;

    constructor(name: string);
}
