import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {ScheduleService} from '../services/schedule.service';
import {FacebookLoginProvider, SocialAuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {AppointmentRequest} from '../interfaces/appointment-request';
import {BarberService} from '../services/barber.service';
import {ServicesService} from '../services/services.service';
import {Barber} from '../models/barber';
import {Service} from '../interfaces/service';
import {EmailNotificationModel} from '../models/EmailNotificationModel';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-barber-book-now-panel',
  templateUrl: './barber-book-now-panel.component.html',
  styleUrls: ['./barber-book-now-panel.component.css'],
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
export class BarberBookNowPanelComponent implements OnInit {
  @ViewChild('parent', {static: true}) parent: ElementRef;

  public step = 'one';
  public barbers: Barber[];
  public services: Service[];

  public barber = new Barber();
  public service = new Service();
  public datetime;

  public client: SocialUser;

  public done;

  constructor(private scheduleService: ScheduleService,
              private facebook: SocialAuthService,
              private barberService: BarberService,
              private servicesService: ServicesService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.servicesService.getAllServices().subscribe(s => {
      this.services = s;
    });

    this.barberService.getBarbers().subscribe(b => {
      this.barbers = b;
    });
  }

  chooseStep(event) {
    const element = event.target || event.srcElement || event.currentTarget;

    const elements = this.parent.nativeElement.getElementsByTagName('li');
    for (const e of elements) {
      e.id = '';
    }

    this.step = element.className;
    element.id = 'clicked';
  }

  chooseBarber(barber) {

    this.barber = barber;
    this.step = 'two';

    // clear
    this.clearClicked();
    this.setClicked(this.step);
  }

  chooseService(service) {

    this.service = service;
    this.step = 'three';

    this.clearClicked();
    this.setClicked(this.step);
  }

  chooseDateTime($event: any) {
    this.datetime = $event;

    this.step = 'four';

    this.clearClicked();
    this.setClicked(this.step);
  }

  private clearClicked() {
    const elements = this.parent.nativeElement.getElementsByTagName('li');
    for (const e of elements) {
      e.id = '';
    }
  }

  private setClicked(step: string) {
    const elements = this.parent.nativeElement.getElementsByTagName('li');
    for (const e of elements) {
      if (step === e.className) {
        e.id = 'clicked';
      }
    }
  }

  sendEmail() {
    // customer oriented email
    const emailNotification = new EmailNotificationModel();
    emailNotification.to = 'petkovhristo94@gmail.com';
    emailNotification.from = 'testov.email.2020@gmail.com';
    emailNotification.subject = 'Cartel Резервация';
    emailNotification.text = 'Здравейте, \n\nУспешно направихте своята резервация!\n\n' + '<b>Бръснар:</b> ' + this.barber.firstName + ' ' + this.barber.lastName + '\n <b>Вид:</b> ' + this.service.serviceType + '\n <b>Цена:</b> ' + this.service.priceBGN + ' лв.' + '\n <b>Продължителност:</b> ' + this.service.duration + ' мин.' + '\n\nПоздрави,\nCartel';

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
}
