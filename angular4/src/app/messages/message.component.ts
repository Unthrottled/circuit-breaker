/**
 * Created by alex on 6/6/17.
 */

import {Component, NgZone, OnInit} from '@angular/core';
import {MessageService} from './message.service';
import {Message} from './message';
import {Observable} from 'rxjs/Observable';
@Component({
    selector: 'message-ticker',
    template: require('./MessageComponent.htm')
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
                if (this.messages.length > 15) {
                    this.messages.shift();
                }
                this.messagesRecieved.push(message);
                this.messages.push(message);
            });
        });
    }

}
