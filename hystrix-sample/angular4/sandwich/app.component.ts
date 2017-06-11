import {Component, OnInit} from '@angular/core';
import {SessionService} from './session.service';
import {Http} from '@angular/http';
import * as http from 'selenium-webdriver/http';
import {HostService} from './host.service';

@Component({
    selector: 'poop',
    template: `        
        <slider></slider>
        <latency></latency>
        <dead-mans-switch></dead-mans-switch>
        <message-ticker></message-ticker>
    `
})
export class AppComponent implements OnInit {

    ngOnInit(): void {
    }
}
