

import {Component} from "@angular/core";

@Component({
    selector: 'hystrix-dashboard',
    template: require('./HystrixDashboard.htm')
})
export class HystrixDashboardComponent {

    private _dashboardHelp: boolean = false;


    get dashboardHelp(): boolean {
        return this._dashboardHelp;
    }

    set dashboardHelp(value: boolean) {
        this._dashboardHelp = value;
    }
}