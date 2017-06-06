/**
 * Created by alex on 6/6/17.
 */

import {Component, OnInit} from '@angular/core';
import {MessageService} from './message.service';
@Component({
    selector: 'message-ticker',
    template: `
            <ul>
                <li *ngFor="let message of messages">
                    <span>{{message}}</span>
                </li>
            </ul>
    `
})
export class MessageComponent implements OnInit {
    constructor(private messageService: MessageService){}
    messages: String[];
    ngOnInit(): void {
        this.messageService.fetchMessages().subscribe(message =>{
            if(this.messages.length > 20){
                this.messages.shift();
            } else {
                this.messages.push(message);
            }
        });
    }


}