import {Component, OnInit} from '@angular/core';
import {Service} from '../../models/service';
import {ServiceService} from '../../services/service.service';
import {BarberService} from '../../services/barber.service';
import {AssignmentService} from '../../services/assignment.service';
import {Assignment} from '../../models/assignment';
import {Barber} from '../../models/barber.model';
import {Router} from '@angular/router';
import {getCookie} from '../../utils/cookie.utils';

@Component({
  selector: 'app-barber-services-panel',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.css'],
})
export class ServiceViewComponent implements OnInit {

  public language: string;
  public services: Service[];
  public barbers: Barber[];
  public assignments: Assignment[];

  constructor(
    private router: Router,
    private servicesService: ServiceService,
    private barberService: BarberService,
    private assignmentService: AssignmentService,
  ) {
  }

  ngOnInit() {
    this.language = getCookie('lang');

    this.servicesService.getServices().subscribe(services => {
      this.services = services;
    });

    this.barberService.getBarbers().subscribe(barbers => {
      this.barbers = barbers;
    });

    this.assignmentService.getAssignments().subscribe(assignments => {
      this.assignments = assignments;
    });
  }

  getAssignment(barber: Barber, service: Service) {
    return this.assignments?.find(assignment => (assignment.barberId === barber.id && assignment.serviceId === service.id));
  }

  book(barber: Barber, service: Service) {
    const assignment = this.getAssignment(barber, service);

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
