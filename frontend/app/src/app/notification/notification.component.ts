import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
        right: '25px',
      })),
      state('closed', style({
        opacity: 0,
        right: '0px',
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {

  message;
  type;
  isOpen = false;

  validTypes = ['success', 'warn', 'info'];

  constructor() {
  }

  ngOnInit(): void {
  }

  showMessage(message: string, type: string) {
    this.message = message;
    this.type = 'default';

    for (const valid of this.validTypes) {
      if (type === valid) {
        this.type = valid;
      }
    }
    this.isOpen = true;

    this.closeMessage();
  }

  closeMessage() {
    setTimeout(() => this.isOpen = false, 2000);
  }
}
