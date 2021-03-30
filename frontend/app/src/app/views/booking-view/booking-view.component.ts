import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {AppointmentService} from '../../services/appointment.service';
import {FacebookLoginProvider, SocialAuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {AppointmentRequest} from '../../interfaces/appointment-request';
import {BarberService} from '../../services/barber.service';
import {ServiceService} from '../../services/service.service';
import {Barber} from '../../models/barber.model';
import {Service} from '../../models/service';
import {EmailNotification} from '../../models/email.notification.model';
import {NotificationService} from '../../services/notification.service';
import {GeneralConfigurationService} from '../../services/general.configuration.service';
import {Step} from '../../models/booking.view/step.model';

@Component({
  selector: 'app-barber-book-now-panel',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.css'],
  animations:
    [
      trigger('fadeOut', [
        transition(':enter', [
          style({opacity: '0'}),
          animate('0.5s ease-in', style({opacity: '1'}))
        ]),
      ]),
    ],
})
export class BookingViewComponent implements OnInit {
  @ViewChild('parent', {static: true}) parent: ElementRef;

  public client: SocialUser;

  public barbers: Barber[];
  public services: Service[];
  public barber = new Barber();
  public service = new Service();
  public datetime;

  public done;

  public appointmentMessage: string;

  public step = 'one';
  public steps: Step[] = [];
  public currentStep: Step;

  constructor(private scheduleService: AppointmentService,
              private facebook: SocialAuthService,
              private barberService: BarberService,
              private servicesService: ServiceService,
              private notificationService: NotificationService,
              private generalConfigurationService: GeneralConfigurationService) {
  }

  ngOnInit() {
    // create the steps
    const step1 = new Step('one', 'Barber', false, 'active');
    const step2 = new Step('two', 'Service', true, 'inactive');
    const step3 = new Step('three', 'Date and Time', true, 'inactive');
    const step4 = new Step('four', 'Finish', true, 'inactive');

    // assign which step is after the other
    step1.next = step2;
    step2.next = step3;
    step3.next = step4;

    // create a list of steps
    this.steps.push(step1, step2, step3, step4);

    // set current
    this.currentStep = step1;

    this.barberService.getBarbers().subscribe(b => {
      this.barbers = b;
    });

    this.servicesService.getServices().subscribe(b => {
      this.services = b;
    });

    this.generalConfigurationService.getAppointmentMessage().subscribe(data => {
      this.appointmentMessage = data;
    });
  }

  makeActive(step: Step) {
    // set clicked step to it's default value
    step.title = step.default;

    // if step is not last and his next step is active
    // then disable all from the current step to the last one.
    if (!step.isLast() && step.isNextDisabled()) {
      this.disableSteps(step);
    }

    for (const s of this.steps) {
      s.active = 'inactive';
    }

    // set the step type aka [ 'one', 'two' ...]
    this.step = step.type;

    step.active = 'active';
    step.disabled = false;

    // set the current step
    this.currentStep = step;
  }

  next(title: string) {
    // set title
    this.currentStep.title = title;

    // switch to next step
    let next = this.currentStep;

    if (!this.currentStep.isLast()) {
      next = this.currentStep.next;
    }

    this.step = next.type;
    this.currentStep = next;

    this.makeActive(next);
  }

  chooseBarber(barber) {
    this.barber = barber;

    const title = barber.firstName.concat(' ').concat(barber.lastName);
    this.next(title);
  }

  chooseService(service) {
    this.service = service;

    const title = service.serviceType;
    this.next(title);
  }

  chooseDateTime(date) {
    this.datetime = date;

    const title = this.datetime.hour.toString();
    this.next(title);
  }

  sendEmail() {

    const appointment = new AppointmentRequest();

    appointment.barberId = this.barber.id;
    appointment.serviceId = this.service.id;
    appointment.hour = this.datetime.hour;
    appointment.date = this.datetime.date;

    // let fbUser = null;
    //
    // this.facebook.signIn(FacebookLoginProvider.PROVIDER_ID).then(f => {
    //   this.facebook.authState.subscribe(u => fbUser = u);
    //   appointment.clientEmail = fbUser.email;
    //   appointment.clientUsername = fbUser.name;
    // });
    //
    this.scheduleService.bookNow(appointment).subscribe(() => {
    }, () => {
    }, () => {
      this.done = true;
    });

    // console.log(fbUser);

    // customer oriented email
    const emailNotification = new EmailNotification();
    emailNotification.to = 'petkovhristo94@gmail.com';
    emailNotification.from = 'testov.email.2020@gmail.com';
    emailNotification.subject = 'Cartel Резервация';
    emailNotification.text = 'Здравейте, \n\nУспешно направихте своята резервация!\n\n' + '<b>Бръснар:</b> ' + this.barber.firstName + ' ' + this.barber.lastName + '\n <b>Вид:</b> ' + this.service.serviceTitle + '\n <b>Цена:</b> ' + ' лв.' + '\n <b>Продължителност:</b> ' + ' мин.' + '\n\nПоздрави,\nCartel';

    this.notificationService.sendEmail(emailNotification).subscribe();
  }

  // facebook
  bookWithFacebook() {
    let fbUser = null;

    this.facebook.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      v => {
        this.facebook.authState.subscribe(u => fbUser = u);

        const appointment: AppointmentRequest = {
          barberId: this.barber.id,
          serviceId: this.service.id,
          hour: this.datetime.hour,
          date: this.datetime.date,
          clientUsername: fbUser.name,
          clientEmail: fbUser.email,
        };

        console.log(fbUser);
        this.scheduleService.bookNow(appointment).subscribe(() => {
        }, () => {
        }, () => {
          this.done = true;
        });
      }
    );
  }

  private disableSteps(step: Step) {
    const next = step.next;

    next.disabled = true;
    next.title = next.default;
    this.done = false;

    if (next.hasNext()) {
      this.disableSteps(next);
    }
  }
}
