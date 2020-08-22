import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';


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
          style({transform: 'translateX(+100%)'}),
          animate('300ms ease-in', style({transform: 'translateX(0%)', transition: '2s'}))
        ]),
      ]),
    ]
})

export class HomeComponent implements OnInit {
  public tab = 'main';

  constructor() {
  }

  ngOnInit() {
  }
}
