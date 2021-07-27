import {Component, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {BarberService} from '../../../../services/barber.service';
import {Barber} from '../../../../models/barber.model';
import {StepEnum} from '../../stepper/step.enum';
import {EventEmitter} from '@angular/core';
import {ChangeStepRequest} from '../../stepper/change-step-request.model';
import {getCookie} from '../../../../utils/cookie.utils';

@Component({
  selector: 'app-barber-step',
  templateUrl: './barber-step.component.html',
  styleUrls: ['./barber-step.component.css']
})
export class BarberStepComponent implements OnInit {

  barbers: Barber[];
  public language: string;

  @Input() stepperData;
  @Output() changeStep = new EventEmitter<ChangeStepRequest>();

  constructor(
    private router: Router,
    private barberService: BarberService,
  ) {
  }

  ngOnInit(): void {
    this.language = getCookie('lang');

    this.barberService.getBarbers().subscribe(barbers => {
      this.barbers = barbers;
    });
  }

  next(barber: Barber) {
    // set data
    const barberName = `${barber.firstName[this.language]} ${barber.lastName[this.language]}`;

    this.stepperData.barberId = barber.id;
    this.stepperData.barberName = barberName;

    const request: ChangeStepRequest = {
      label: barberName,
      step: StepEnum.SERVICE_STEP
    };

    this.changeStep.emit(request);
  }
}
