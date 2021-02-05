import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

export const fade =
  trigger('Fade', [
    transition(':enter', [
      style({opacity: '0'}),
      animate('0.5s ease-in', style({opacity: '1'}))
    ]),
  ]);

