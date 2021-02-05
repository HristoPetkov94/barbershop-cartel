import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {ScheduleService} from '../../services/schedule.service';
import {FacebookLoginProvider, SocialAuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {AppointmentRequest} from '../../interfaces/appointment-request';
import {BarberService} from '../../services/barber.service';
import {ServicesService} from '../../services/services.service';
import {Barber} from '../../models/barber.model';
import {Service} from '../../interfaces/service';
import {EmailNotification} from '../../models/email.notification.model';
import {NotificationService} from '../../services/notification.service';
import {GeneralConfigurationService} from '../../services/general.configuration.service';

interface Step {
  type: string;
  title: string;
  disabled: boolean;
  active: string;
}

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

  public barbers: Barber[];
  public barber = new Barber();
  public service = new Service();
  public datetime;

  public step = 'one';
  public stepIndex = 0;

  public client: SocialUser;
  public done;
  public appointmentMessage: string;

  public steps: Step[] = [
    {
      type: 'one',
      title: 'Barber',
      disabled: false,
      active: 'active',
    },
    {
      type: 'two',
      title: 'Service',
      disabled: true,
      active: 'inactive',
    },
    {
      type: 'three',
      title: 'Date and Time',
      disabled: true,
      active: 'inactive',
    },
    {
      type: 'four',
      title: 'Finish',
      disabled: true,
      active: 'inactive',
    }
  ];

  public defaults = ['Barber', 'Service', 'Date and Time', 'Finish'];

  constructor(private scheduleService: ScheduleService,
              private facebook: SocialAuthService,
              private barberService: BarberService,
              private servicesService: ServicesService,
              private notificationService: NotificationService,
              private generalConfigurationService: GeneralConfigurationService) {
  }

  ngOnInit() {
    this.barberService.getBarbers().subscribe(b => {
      this.barbers = b;
    });

    this.generalConfigurationService.getAppointmentMessage().subscribe(data => {
      this.appointmentMessage = data;
    });
  }

  makeActive(index, step: string) {

    // clear rest
    if (index < this.stepIndex) {
      this.clearPrevious(index);
    }

    this.step = step;

    for (const s of this.steps) {
      s.active = 'inactive';
    }

    this.steps[index].active = 'active';
    this.stepIndex = index;
  }

  next(step: string, title: string) {
    this.steps[this.stepIndex].title = title;

    this.stepIndex++;

    this.step = step;
    this.steps[this.stepIndex].disabled = false;

    this.makeActive(this.stepIndex, this.step);
  }

  chooseBarber(barber) {

    this.barber = barber;
    this.step = 'two';

    const title = barber.firstName.concat(' ').concat(barber.lastName);
    this.next(this.step, title);
  }

  chooseService(service) {

    this.service = service;
    this.step = 'three';

    const title = service.serviceType;
    this.next(this.step, title);
  }

  chooseDateTime($event: any) {
    this.datetime = $event;

    this.step = 'four';

    const title = this.datetime.hour.toString();
    this.next(this.step, title);
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
    emailNotification.text = 'Здравейте, \n\nУспешно направихте своята резервация!\n\n' + '<b>Бръснар:</b> ' + this.barber.firstName + ' ' + this.barber.lastName + '\n <b>Вид:</b> ' + this.service.serviceType + '\n <b>Цена:</b> ' + this.service.price + ' лв.' + '\n <b>Продължителност:</b> ' + this.service.duration + ' мин.' + '\n\nПоздрави,\nCartel';

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

  private clearPrevious(index) {
    for (let i = index + 1; i < this.steps.length; i++) {
      this.steps[i].title = this.defaults[i];
      this.steps[i].disabled = true;
    }
  }
}
