/**
 * Created by alex on 6/6/17.
 */

import {Component, NgZone, OnInit} from '@angular/core';
import {MessageService} from './message.service';
import {Message} from './message';
@Component({
    selector: 'message-ticker',
    template: `
        <span class="stream-table">
                    <div *ngFor="let x of messages">
                        <span [ngClass]="{'worked': x.isSuccess(), 'failed': !x.isSuccess() }" class="stream-data">{{x.getMessage()}}</span>
                    </div>
        </span>
    `
})
export class MessageComponent implements OnInit {
    public messages: Message[] = [];

    constructor(private messageService: MessageService, private zone: NgZone) {
    }

    ngOnInit(): void {
        this.messageService.fetchMessages().subscribe(message => {
            this.zone.run(() => {
                if (this.messages.length > 20) {
                    this.messages.shift();
                }
                this.messages.push(message);
            });
        });
    }

}
