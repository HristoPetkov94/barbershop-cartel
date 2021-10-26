import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceService} from '../../../../services/service.service';
import {Service} from '../../../../models/service';
import {AssignmentService} from '../../../../services/assignment.service';
import {Assignment} from '../../../../models/assignment';
import {ChangeStepRequest} from '../../stepper/change-step-request.model';
import {StepEnum} from '../../stepper/step.enum';

@Component({
  selector: 'app-service-step',
  templateUrl: './service-step.component.html',
  styleUrls: ['./service-step.component.css']
})
export class ServiceStepComponent implements OnInit {

  @Input() stepperData;
  @Output() changeStep = new EventEmitter<ChangeStepRequest>();

  services: Service[];
  assignments: Assignment[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private assignmentService: AssignmentService) {
  }

  ngOnInit(): void {

    this.serviceService.getServices().subscribe(services => {
      this.services = services;
    });

    this.assignmentService.getAssignments().subscribe(assignments => {

      this.assignments = assignments;
    });
  }

  get serviceViewArray() {
    const result: { service: Service, assignment: Assignment }[] = [];

    const barberAssignments = this.assignments?.filter(assignment => assignment.barberId === this.stepperData.barberId);

    this.services?.forEach(service => {
      barberAssignments?.forEach(assignment => {

        if (service.id === assignment.serviceId) {
          result.push({service, assignment});
        }
      });
    });

    return result;
  }

  next(element: any) {

    this.stepperData.serviceId = element.service.id;
    this.stepperData.serviceTitle = element.service.serviceTitle;

    this.stepperData.assignmentId = element.assignment.id;
    this.stepperData.assignmentPrice = element.assignment.price;
    this.stepperData.assignmentDuration = element.assignment.duration;

    const request: ChangeStepRequest = {
      label: element.service.serviceTitle,
      step: StepEnum.DATE_STEP
    };

    this.changeStep.emit(request);
  }
}
