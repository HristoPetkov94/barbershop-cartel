import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceService} from '../../../../services/service.service';
import {Service} from '../../../../models/service';
import {AssignmentService} from '../../../../services/assignment.service';
import {Assignment} from '../../../../models/assignment';

@Component({
  selector: 'app-service-step',
  templateUrl: './service-step.component.html',
  styleUrls: ['./service-step.component.css']
})
export class ServiceStepComponent implements OnInit {

  private barberId;

  services: Service[];
  assignments: Assignment[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private assignmentService: AssignmentService,
  ) {
  }

  ngOnInit(): void {
    console.log('getting param from route...');

    const routeParams = this.route.snapshot.paramMap;
    this.barberId = Number(routeParams.get('barberId'));

    this.serviceService.getServices().subscribe(services => {
      console.log('loading services...');
      this.services = services;
    });

    this.assignmentService.getAssignments().subscribe(assignments => {
      console.log('loading assignments...');
      this.assignments = assignments;
    });
  }

  get serviceViewArray() {
    console.log('preparing services to display...');

    const result: { service: Service, assignment: Assignment }[] = [];

    const barberAssignments = this.assignments?.filter(assignment => assignment.barberId === this.barberId);

    this.services?.forEach(service => {
      barberAssignments?.forEach(assignment => {

        if (service.id === assignment.serviceId) {
          result.push({service, assignment});
        }
      });
    });

    return result;
  }

  next(service: Service) {
    this.router.navigate(['/book-now/datetime', this.barberId, service.id]);
  }
}
