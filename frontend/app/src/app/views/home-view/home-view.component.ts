import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

// TODO: Refactor everything here methods, split into components if you have to, refactor css to make it more readable, delete unused stuff.

// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
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

export class HomeViewComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
