import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
import {NouisliderModule} from 'ng2-nouislider';
import {UiSwitchModule} from 'angular2-ui-switch';
import {MessageComponent} from './messages/message.component';
import {SwitchComponent} from './switch/switch.component';
import {ThrottleComponent} from './sliders/throttle.component';
import {LatencyCompontent} from './sliders/latency.component';
import {HostService} from './session/host.service';
import {SessionService} from './session/session.service';
import {MessageService} from './messages/message.service';
import {WindowRef} from './util/window';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NouisliderModule,
        UiSwitchModule
    ],
    declarations: [
        AppComponent,
        MessageComponent,
        SwitchComponent,
        ThrottleComponent,
        LatencyCompontent
    ],
    bootstrap: [AppComponent],
    providers: [HostService, SessionService, MessageService, WindowRef]
})
export class AppModule {
}
