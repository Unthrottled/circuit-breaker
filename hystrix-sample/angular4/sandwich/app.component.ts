import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'poop',
    template: `
        <message-ticker></message-ticker>
        <slider [change]="chango"></slider>
        <slider [change]="changoDose"></slider>
    `
})
export class AppComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
        console.log("poopy");
    }

    chango(): void {
        console.log("fixo chango");
    }

    changoDose(): void {
        console.log("Dose Equis");
    }
}
