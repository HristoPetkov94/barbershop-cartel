import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppointmentService} from '../../../../services/appointment.service';
import {AppointmentRequest} from '../../../../interfaces/appointment-request';
import {ChangeStepRequest} from '../../stepper/change-step-request.model';

@Component({
  selector: 'app-finish-step',
  templateUrl: './finish-step.component.html',
  styleUrls: ['./finish-step.component.css']
})
export class FinishStepComponent implements OnInit {

  @Input() stepController;
  @Output() changeStep = new EventEmitter<ChangeStepRequest>();

  public assignmentId;

  public appointment = new AppointmentRequest();

  public done = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
  ) {
  }

  ngOnInit(): void {
    console.log('finish step');
  }

  makeAnAppointment() {

    this.appointment.assignmentId = this.stepperData.assignmentId;
    this.appointment.hour = this.stepperData.hour;
    this.appointment.date = this.stepperData.date;

    this.appointmentService.bookNow(this.appointment).subscribe(() => {
    }, () => {
    }, () => {
      this.done = true;
      this.stepController.disableSteps();
    });
  }

  goBackHome() {
    this.router.navigate(['/']);
  }

  get stepperData() {
    return this.stepController.data;
  }
}
