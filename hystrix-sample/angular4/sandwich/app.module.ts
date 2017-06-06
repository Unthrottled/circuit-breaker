import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
import {HostService} from './host.service';
import {SessionService} from './session.service';
import {MessageComponent} from './message.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
        AppComponent,
        MessageComponent
    ],
    bootstrap: [AppComponent],
    providers: [HostService, SessionService]
})
export class AppModule {
}
