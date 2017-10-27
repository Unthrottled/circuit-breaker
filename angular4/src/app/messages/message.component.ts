/**
 * Created by alex on 6/6/17.
 */

import {Component, NgZone, OnInit} from '@angular/core';
import {MessageService} from './message.service';
import {Message} from './message';
import {Observable} from 'rxjs/Observable';
@Component({
    selector: 'message-ticker',
    template: `
        <div [hidden]="messagesPerSecond <= 0">
            {{messagesPerSecond}} actual messages per second
        </div>
        <span class="stream-table">
                    <div *ngFor="let x of messages">
                        <span [ngClass]="{'worked': x.isSuccess(), 'failed': !x.isSuccess() }" class="stream-data">{{x.getMessage()}}</span>
                    </div>
        </span>
    `
})
export class MessageComponent implements OnInit {
    public messages: Message[] = [];
    public messagesPerSecond = 0;

    private messagesRecieved: Message[] = [];


    constructor(private messageService: MessageService, private zone: NgZone) {
        let self = this;
        Observable.interval(1000)
            .subscribe((int: number)=>{
                self.zone.run(()=>{
                   self.messagesPerSecond = self.messagesRecieved.length;
                   self.messagesRecieved = [];
                });
            })
    }

    ngOnInit(): void {
        this.messageService.fetchMessages().subscribe(message => {
            this.zone.run(() => {
                if (this.messages.length > 20) {
                    this.messages.shift();
                }
                this.messagesRecieved.push(message);
                this.messages.push(message);
            });
        });
    }

}
