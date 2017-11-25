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
import {SessionService} from './session/session.service';
import {MessageService} from './messages/message.service';
import {WindowRef} from './util/window';
import {HystrixDashboardComponent} from "./hystrix/HystrixDashboard.component";
import {DialogComponent} from "./util/dialog.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NouisliderModule,
        UiSwitchModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        MessageComponent,
        SwitchComponent,
        ThrottleComponent,
        LatencyCompontent,
        HystrixDashboardComponent,
        DialogComponent
    ],
    bootstrap: [AppComponent],
    providers: [SessionService, MessageService, WindowRef]
})
export class AppModule {

}
