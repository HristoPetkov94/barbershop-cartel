import {Component, OnInit} from '@angular/core';
import {StepEnum} from './stepper/step.enum';
import {ChangeStepRequest} from './stepper/change-step-request.model';
import {StepController} from './stepper/step.controller';
import {Step} from './stepper/step.model';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.css']
})
export class AppointmentViewComponent implements OnInit {

  public stepController = new StepController();

  public BARBER_STEP = StepEnum.BARBER_STEP;
  public SERVICE_STEP = StepEnum.SERVICE_STEP;
  public DATE_STEP = StepEnum.DATE_STEP;
  public FINISH_STEP = StepEnum.FINISH_STEP;

  constructor() {
  }

  ngOnInit() {

    this.stepController.addStep(new Step('stepper.barber', false));
    this.stepController.addStep(new Step('stepper.service', true));
    this.stepController.addStep(new Step('stepper.dateTime', true));
    this.stepController.addStep(new Step('stepper.finish', true));

    const data = history.state.data;

    if (data) {
      this.skipSteps(data);
    }
  }

  changeStep(request: ChangeStepRequest) {
    this.stepController.changeStep(request);
  }

  changeStepTo(index: number) {
    this.stepController.changeStepTo(index);
  }

  skipSteps(data: any): void {
    // set data
    if (data.barber) {

      this.stepperData.barberId = data.barber.id;
      this.stepperData.firstName = data.barber.firstName;
      this.stepperData.lastName = data.barber.lastName;

      const fullName = {};

      const entries = data.barber.firstName;

      for (const [key, value] of Object.entries(entries)) {
        const fName = data.barber.firstName[key];
        const lName = data.barber.lastName[key];

        fullName[key] = `${fName} ${lName}`;
      }

      const serviceRequest: ChangeStepRequest = {
        label: fullName,
        step: StepEnum.SERVICE_STEP
      };

      this.changeStep(serviceRequest);
    }

    if (data.service) {

      const serviceTitle = '';

      this.stepperData.serviceId = data.service.id;
      this.stepperData.serviceTitle = serviceTitle.toString();

      this.stepperData.assignmentId = data.assignment.id;
      this.stepperData.assignmentPrice = data.assignment.price;
      this.stepperData.assignmentDuration = data.assignment.duration;

      const dateRequest: ChangeStepRequest = {
        label: data.service.serviceTitle,
        step: StepEnum.DATE_STEP
      };

      this.changeStep(dateRequest);
    }
  }

  get steps(): Step[] {
    return this.stepController.steps;
  }

  get currentStep(): number {
    return this.stepController.currentStep;
  }

  get stepperData() {
    return this.stepController.data;
  }

  isString(step) {
    return typeof step === 'string' || step instanceof String;
  }
}
