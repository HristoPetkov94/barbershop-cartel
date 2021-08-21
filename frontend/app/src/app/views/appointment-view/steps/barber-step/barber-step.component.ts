import {Component, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {BarberService} from '../../../../services/barber.service';
import {Barber} from '../../../../models/barber.model';
import {StepEnum} from '../../stepper/step.enum';
import {EventEmitter} from '@angular/core';
import {ChangeStepRequest} from '../../stepper/change-step-request.model';
import {LanguagePipe} from '../../../../pipes/language-pipe';

@Component({
  selector: 'app-barber-step',
  templateUrl: './barber-step.component.html',
  styleUrls: ['./barber-step.component.css']
})
export class BarberStepComponent implements OnInit {

  barbers: Barber[];

  @Input() stepperData;
  @Output() changeStep = new EventEmitter<ChangeStepRequest>();

  constructor(
    private router: Router,
    private barberService: BarberService) {
  }

  ngOnInit(): void {

    this.barberService.getBarbers().subscribe(barbers => {
      this.barbers = barbers;
    });
  }

  next(barber: Barber) {
    this.stepperData.barberId = barber.id;

    this.stepperData.firstName = barber.firstName;
    this.stepperData.lastName = barber.lastName;

    const fullName = {};

    const entries = barber.firstName;

    for (const [key, value] of Object.entries(entries)) {
      const fName = barber.firstName[key];
      const lName = barber.lastName[key];

      fullName[key] = `${fName} ${lName}`;
    }

    console.log(fullName);
    const request: ChangeStepRequest = {
      label: fullName,
      step: StepEnum.SERVICE_STEP
    };

    this.changeStep.emit(request);
  }
}
