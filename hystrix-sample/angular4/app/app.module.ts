import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
import {HostService} from './host.service';
import {SessionService} from './session.service';
import {MessageComponent} from './message.component';
import {MessageService} from './message.service';
import {WindowRef} from './window';
import {NouisliderModule} from 'ng2-nouislider';
import {UiSwitchModule} from 'angular2-ui-switch';
import {SwitchComponent} from './switch.component';
import {LatencyCompontent} from './latency.component';
import {ThrottleComponent} from './throttle.component';

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
