import {Component, Input, OnInit} from '@angular/core';
import {Service} from '../../../models/service';
import {Assignment} from '../../../models/assignment';
import {Barber} from '../../../models/barber.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-service-flip-card',
  templateUrl: './service-flip-card.component.html',
  styleUrls: ['./service-flip-card.component.css']
})
export class ServiceFlipCardComponent implements OnInit {

  @Input()
  service: Service;

  @Input()
  barbers: Barber[];

  @Input()
  priceList: Assignment[];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  getBarberNames(barberId): any[] {
    const barber = this.barbers.find(b => b.id === barberId);
    return [barber.firstName, barber.lastName];
  }

  book(barberId, service: Service, assignment: Assignment) {
    const barber = this.barbers.find(b => b.id === barberId);

    // https://medium.com/ableneo/how-to-pass-data-between-routed-components-in-angular-2306308d8255
    this.router.navigate(['/book-now'], {
      state: {
        data: {
          barber,
          service,
          assignment
        },
      }
    });
  }
}
