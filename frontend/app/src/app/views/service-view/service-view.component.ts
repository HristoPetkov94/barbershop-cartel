import {Component, OnInit} from '@angular/core';
import {Service} from '../../models/service';
import {ServiceService} from '../../services/service.service';
import {BarberService} from '../../services/barber.service';
import {AssignmentService} from '../../services/assignment.service';
import {Assignment} from '../../models/assignment';
import {Barber} from '../../models/barber.model';

@Component({
  selector: 'app-barber-services-panel',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.css'],
})
export class ServiceViewComponent implements OnInit {

  public services: Service[];
  public barbers: Barber[];
  public assignments: Assignment[];

  constructor(private servicesService: ServiceService,
              private barberService: BarberService,
              private assignmentService: AssignmentService) {
  }

  ngOnInit() {
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
}
