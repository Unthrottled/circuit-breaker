import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'poop',
    template: `        
        <slider [change]="chango"></slider>
        <slider [change]="changoDose"></slider>
        <message-ticker></message-ticker>
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
