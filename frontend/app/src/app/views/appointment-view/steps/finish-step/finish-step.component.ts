import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppointmentService} from '../../../../services/appointment.service';
import {AppointmentRequest} from '../../../../interfaces/appointment-request';
import {ChangeStepRequest} from '../../stepper/change-step-request.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LanguagePipe} from '../../../../pipes/language-pipe';

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

  myForm: FormGroup;
  //TODO: find better regex
  reg = '(^(\\+359)|0)\\d{9}$';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private languagePipe: LanguagePipe
  ) {
  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
        email: ['', Validators.email],
        phone: ['', Validators.pattern(this.reg)],
      }
    );
  }

  get email() {
    return this.myForm.get('email');
  }

  get phone() {
    return this.myForm.get('phone');
  }

  makeAnAppointment() {

    this.appointment.assignmentId = this.stepperData.assignmentId;
    this.appointment.hour = this.stepperData.hour;
    this.appointment.date = this.stepperData.date;

    const language = this.languagePipe.language;
    this.appointmentService.bookNow(this.appointment, language).subscribe(() => {
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
