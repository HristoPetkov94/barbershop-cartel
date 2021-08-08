import {Component, OnInit} from '@angular/core';
import {StepEnum} from './stepper/step.enum';
import {ChangeStepRequest} from './stepper/change-step-request.model';
import {StepController} from './stepper/step.controller';
import {Step} from './stepper/step.model';
import {LanguagePipe} from '../../pipes/language-pipe';

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

  constructor(private languagePipe: LanguagePipe) {
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

      const firstName = this.languagePipe.transform(data.barber.firstName);
      const lastName = this.languagePipe.transform(data.barber.lastName);

      const barberName = `${firstName} ${lastName}`;
      this.stepperData.barberId = data.barber.id;
      this.stepperData.barberName = barberName;

      const serviceRequest: ChangeStepRequest = {
        label: barberName,
        step: StepEnum.SERVICE_STEP
      };

      this.changeStep(serviceRequest);
    }

    if (data.service) {

      const serviceTitle = this.languagePipe.transform(data.service.serviceTitle);

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
}
