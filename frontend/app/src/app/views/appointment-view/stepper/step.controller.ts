import {Step} from './step.model';
import {ChangeStepRequest} from './change-step-request.model';
import {StepperDataModel} from './stepper-data.model';

export class StepController {

  private currentStepInternal = 0;

  readonly stepArray: Step[];

  public data = new StepperDataModel();

  constructor() {
    this.stepArray = [];
  }

  addStep(step: Step) {
    this.stepArray.push(step);
  }

  get currentStep() {
    return this.currentStepInternal;
  }

  get steps() {
    return this.stepArray;
  }

  changeStep(request: ChangeStepRequest) {
    // set current step label
    this.steps[this.currentStepInternal].label = request.label;

    // activate next step
    this.steps[request.step].disabled = false;

    // switch to next step
    this.currentStepInternal = request.step;
  }

  changeStepTo(index: number) {
    // set default label to selected step
    const selectedStep = this.steps[index];
    selectedStep.label = selectedStep.defaultLabel;

    // disable steps if going back
    if (this.currentStepInternal > index) {
      for (let i = index + 1; i < this.steps.length; i++) {
        const step = this.steps[i];

        step.disabled = true;
        step.label = step.defaultLabel;
      }
    }

    // switch to selected step
    this.currentStepInternal = index;
  }

  disableSteps() {
    this.steps.forEach(step => step.disabled = true);
  }
}
