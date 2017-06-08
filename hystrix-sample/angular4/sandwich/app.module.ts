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
import {KnobCompontent} from './knob.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        MessageComponent,
        KnobCompontent
    ],
    bootstrap: [AppComponent],
    providers: [HostService, SessionService, MessageService, WindowRef]
})
export class AppModule {
}
