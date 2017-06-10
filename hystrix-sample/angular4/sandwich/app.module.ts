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
import {SliderCompontent} from './slider.component';
import { NouisliderModule } from 'ng2-nouislider';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NouisliderModule
    ],
    declarations: [
        AppComponent,
        MessageComponent,
        SliderCompontent
    ],
    bootstrap: [AppComponent],
    providers: [HostService, SessionService, MessageService, WindowRef]
})
export class AppModule {
}
