import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <message-ticker></message-ticker>
    `
})
export class AppComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {

    }
}
