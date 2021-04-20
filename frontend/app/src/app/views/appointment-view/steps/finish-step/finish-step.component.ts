import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppointmentService} from '../../../../services/appointment.service';
import {AppointmentRequest} from '../../../../interfaces/appointment-request';
import {ChangeStepRequest} from '../../stepper/change-step-request.model';
import {EmailNotification} from '../../../../models/email.notification.model';
import {NotificationService} from '../../../../services/notification.service';

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
    private notificationService: NotificationService,
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
      // TODO: move to backend
      this.sendMail();
    });
  }

  sendMail() {
    // customer oriented email
    const emailNotification = new EmailNotification();
    emailNotification.to = 'petkovhristo94@gmail.com';
    emailNotification.from = 'testov.email.2020@gmail.com';
    emailNotification.subject = 'Cartel Резервация';

    const greeting = 'Здравейте, \n\nУспешно направихте своята резервация!\n\n';
    const barber = `<b>Бръснар:</b> ${this.stepperData.barberName}\n`;
    const service = `<b>Вид:</b> ${this.stepperData.serviceTitle}\n`;
    const price = `<b>Цена:</b> ${this.stepperData.assignmentPrice} лв.\n`;
    const duration = `<b>Продължителност:</b> ${this.stepperData.assignmentDuration} мин.`;
    const farewell = '\\n\\nПоздрави,\\nCartel';

    emailNotification.text = [greeting, barber, service, price, duration, farewell].join();
    this.notificationService.sendEmail(emailNotification).subscribe();
  }

  goBackHome() {
    this.router.navigate(['/']);
  }

  get stepperData() {
    return this.stepController.data;
  }
}
