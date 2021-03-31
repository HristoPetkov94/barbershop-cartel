import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceService} from '../../../../services/service.service';
import {BarberService} from '../../../../services/barber.service';
import {Barber} from '../../../../models/barber.model';
import {Service} from '../../../../models/service';
import {Assignment} from '../../../../models/assignment';

@Component({
  selector: 'app-date-step',
  templateUrl: './date-step.component.html',
  styleUrls: ['./date-step.component.css']
})
export class DateStepComponent implements OnInit {
  private barberId;
  private serviceId;

  barbers: Barber[];
  services: Service[];
  assignments: Assignment[];

  barber: Barber;
  service: Service;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // these can be removed
    // only having the assignment should be enough
    private barberService: BarberService,
    private serviceService: ServiceService,
  ) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;

    this.barberId = Number(routeParams.get('barberId'));
    this.serviceId = Number(routeParams.get('serviceId'));

    this.barberService.getBarbers().subscribe(barbers => {
      console.log('loading barbers...');

      this.barbers = barbers;

      this.barber = this.barbers?.find(barber => barber.id === this.barberId);
    });

    this.serviceService.getServices().subscribe(services => {
      console.log('loading services...');
      this.services = services;

      this.service = this.services?.find(service => service.id === this.serviceId);
    });

  }

  next() {
    this.router.navigate(['/book-now/finish']);
  }

  chooseDateTime($event: any) {

  }
}
