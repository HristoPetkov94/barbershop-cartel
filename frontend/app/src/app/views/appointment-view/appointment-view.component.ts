import {Component, OnInit} from '@angular/core';
import {StepEnum} from './stepper/step.enum';
import {ChangeStepRequest} from './stepper/change-step-request.model';
import {StepController} from './stepper/step.controller';
import {Step} from './stepper/step.model';
import {getCookie} from '../../utils/cookie.utils';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.css']
})
export class AppointmentViewComponent implements OnInit {

  public language: string;
  public stepController = new StepController();

  public BARBER_STEP = StepEnum.BARBER_STEP;
  public SERVICE_STEP = StepEnum.SERVICE_STEP;
  public DATE_STEP = StepEnum.DATE_STEP;
  public FINISH_STEP = StepEnum.FINISH_STEP;

  constructor() {
  }

  ngOnInit() {
    this.language = getCookie('lang');

    this.stepController.addStep(new Step('Бръснар', false));
    this.stepController.addStep(new Step('Услуга', true));
    this.stepController.addStep(new Step('Дата и час', true));
    this.stepController.addStep(new Step('Приключване', true));

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
      const barberName = `${data.barber.firstName[this.language]} ${data.barber.lastName[this.language]}`;
      this.stepperData.barberId = data.barber.id;
      this.stepperData.barberName = barberName;

      const serviceRequest: ChangeStepRequest = {
        label: barberName,
        step: StepEnum.SERVICE_STEP
      };

      this.changeStep(serviceRequest);
    }

    if (data.service) {
      this.stepperData.serviceId = data.service.id;
      this.stepperData.serviceTitle = data.service.serviceTitle;

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
}
