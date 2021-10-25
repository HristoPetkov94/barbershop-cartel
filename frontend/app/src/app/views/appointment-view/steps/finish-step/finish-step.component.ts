import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppointmentService} from '../../../../services/appointment.service';
import {AppointmentRequest} from '../../../../interfaces/appointment-request';
import {ChangeStepRequest} from '../../stepper/change-step-request.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LanguagePipe} from '../../../../pipes/language-pipe';
import * as dayjs from 'dayjs';
import {GeneralConfigurationService} from '../../../../services/general.configuration.service';
import {LanguageEnum} from '../../../../enums/language.enum';

@Component({
  selector: 'app-finish-step',
  templateUrl: './finish-step.component.html',
  styleUrls: ['./finish-step.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FinishStepComponent implements OnInit {

  @Input() stepController;
  @Output() changeStep = new EventEmitter<ChangeStepRequest>();

  format = 'YYYY-MM-DDTHH:mm:ss';

  public assignmentId;
  public appointment = new AppointmentRequest();
  public done = false;

  public appointmentSuccessMessage = {};

  myForm: FormGroup;
  // TODO: find better regex
  reg = '(^(\\+359)|0)\\d{9}$';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private languagePipe: LanguagePipe,
    private generalConfigurationService: GeneralConfigurationService
  ) {
  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
        email: ['', Validators.email],
        phone: ['', Validators.pattern(this.reg)],
      }
    );

    this.generalConfigurationService.getConfiguration().subscribe(configuration => {

      const messageBG = configuration.appointmentSuccessMessage[LanguageEnum.BG];
      const messageEN = configuration.appointmentSuccessMessage[LanguageEnum.EN];

      // Change style for both of the languages and cash it into variable appointmentSuccessMessage.
      // This way we can change language without reload.
      this.changeStyle(messageBG, LanguageEnum.BG);
      this.changeStyle(messageEN, LanguageEnum.EN);
    });
  }

  get email() {
    return this.myForm.get('email');
  }

  get phone() {
    return this.myForm.get('phone');
  }

  makeAnAppointment() {

    this.appointment.assignmentId = this.stepperData.assignmentId;
    this.appointment.barberId = this.stepperData.barberId;

    const datetime = dayjs(new Date(this.stepperData.date + ' ' + this.stepperData.hour));

    this.appointment.start = datetime.format(this.format);
    this.appointment.end = datetime.add(this.stepperData.assignmentDuration, 'm').format(this.format);

    this.appointment.phone = this.phone.value;
    this.appointment.email = this.email.value;

    this.appointmentService.create(this.appointment).subscribe(() => {
    }, () => {
      console.log('error');
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

  private changeStyle(message, language) {
    const regex = /.*\n*.*#/g;
    const result = message.match(regex);

    this.appointmentSuccessMessage[language] = message;

    // set default style
    this.appointmentSuccessMessage[language] = `<div class="sub-msg">${this.appointmentSuccessMessage[language]}</div>`;

    // set style on # words
    for (const res of result) {
      const word = res.replace(/#/g, '');

      const row = word.split('\n');
      this.appointmentSuccessMessage[language] = this.appointmentSuccessMessage[language]
        .replace(res, '<div class="col main-msg">' + '<div>' + row[0] + '</div>' + '<p>' + row[1] + '</p>' + '</div>');
    }
  }
}
