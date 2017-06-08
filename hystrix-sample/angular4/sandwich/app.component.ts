import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'poop',
    template: `
        <message-ticker></message-ticker>
        <knob></knob>
    `
})
export class AppComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {

    }
}
