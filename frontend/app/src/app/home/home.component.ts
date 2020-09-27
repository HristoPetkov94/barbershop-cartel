import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ViewEncapsulation} from '@angular/cli/lib/config/schema';


// TODO: Refactor everything here methods, split into components if you have to, refactor css to make it more readable, delete unused stuff.

// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:
    [
      trigger('slideInOut', [
        transition(':enter', [
          style({transform: 'translateX(+100%)', overflow: 'hidden', height: '110%'}),
          animate('300ms ease-in', style({transform: 'translateX(0%)', transition: '2s', overflow: 'hidden', height: '110%'}))
        ]),
      ]),
    ],
})

export class HomeComponent implements OnInit {
  public tab = 'main';
  public hideBurger = false;

  constructor() {
  }

  ngOnInit() {
  }

  navigate($event: any) {
    this.tab = $event;
  }
}
