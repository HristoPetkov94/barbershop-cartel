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
          style({opacity: '0'}),
          animate('0.5s ease-in', style({opacity: '1'}))
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
