import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {ScheduleService} from '../services/schedule.service';
import {FacebookLoginProvider, SocialAuthService} from "angularx-social-login";
import {SocialUser} from "angularx-social-login";

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

  private step = 'one';
  private barbers = [1, 2, 3, 4];
  private services = [1, 2, 3, 4];

  private barber;
  private service;
  private datetime;

  private personalInfo;

  constructor(private scheduleService: ScheduleService, private facebook: SocialAuthService) {
  }

  ngOnInit() {
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

  // facebook
  bookWithFacebook() {
    let fbUser = null;

    this.facebook.authState.subscribe(u => console.log(u));

    const appointment: AppointmentRequest = {
      barberId: 1,
      serviceId: 1,
      hour: this.datetime.hour,
      date: this.datetime.date,
      clientUsername: fbUser.name,
      clientEmail: fbUser.email,
    };

    // console.log(fbUser);
    this.scheduleService.bookNow(appointment).subscribe(d => console.log('saved.'));
  }
}
