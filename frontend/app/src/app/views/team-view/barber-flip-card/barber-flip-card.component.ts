import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-barber-flip-card',
  templateUrl: './barber-flip-card.component.html',
  styleUrls: ['./barber-flip-card.component.css']
})
export class BarberFlipCardComponent implements OnInit {

  @Input()
  _barber: any;

  @Input()
  get barber(): any {
    return this._barber;
  }

  set barber(barbers: any) {
    this._barber = barbers;
  }

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  book(barber: any) {
    // https://medium.com/ableneo/how-to-pass-data-between-routed-components-in-angular-2306308d8255
    this.router.navigate(['/book-now'], {
      state: {
        data: {
          barber
        },
      }
    });
  }
}
