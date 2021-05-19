import {animate, style, transition, trigger} from '@angular/animations';

export const transitionFade =
  trigger('TransitionFade', [
    transition('* <=> *', [
      style({opacity: '0'}),
      animate('0.3s ease-in', style({opacity: '1'}))
    ]),
  ]);

