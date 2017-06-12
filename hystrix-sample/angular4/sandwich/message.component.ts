/**
 * Created by alex on 6/6/17.
 */

import {NgZone, Component, OnInit} from '@angular/core';
import {MessageService} from './message.service';
@Component({
    selector: 'message-ticker',
    template: `
        <span class="stream-table">
                    <span *ngFor="let x of messages">
                        <span class="stream-data">{{x}}</span>
                    </span>
        </span>
    `
})
export class MessageComponent implements OnInit {
    public messages: String[] = ['2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222','2222222222222222222222'];

    constructor(private messageService: MessageService, private zone: NgZone) {
    }

    ngOnInit(): void {
        this.messageService.fetchMessages().subscribe(message => {
            this.zone.run(()=>{
                if (this.messages.length > 20) {
                    this.messages.shift();
                }
                this.messages.push(message);
            });
        });
    }


}