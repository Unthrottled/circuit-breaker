import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
import {HttpModule} from '@angular/http';
import {HostService} from './host.service';
import {SessionService} from './session.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
        AppComponent,
        HeroDetailComponent
    ],
    bootstrap: [AppComponent],
    providers: [HeroService, HostService, SessionService]
})
export class AppModule {
}
