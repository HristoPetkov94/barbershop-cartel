import {Component, OnInit} from '@angular/core';
import {AppointmentRequest} from '../../interfaces/appointment-request';
import {ScheduleService} from '../../services/schedule.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  public appointment = new AppointmentRequest();

  public steps = [
    { link: '/book-now/barber', label: 'barber' },
    { link: '/book-now/service', label: 'service' },
    { link: '/book-now/datetime', label: 'datetime' },
    { link: '/book-now/finish', label: 'finish' },
  ];

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
  }

  makeAnAppointment() {

    // this.appointment.barberId = this.barber.id;
    // this.appointment.serviceId = this.service.id;
    // this.appointment.hour = this.datetime.hour;
    // this.appointment.date = this.datetime.date;

    // let fbUser = null;
    //
    // this.facebook.signIn(FacebookLoginProvider.PROVIDER_ID).then(f => {
    //   this.facebook.authState.subscribe(u => fbUser = u);
    //   appointment.clientEmail = fbUser.email;
    //   appointment.clientUsername = fbUser.name;
    // });
    //
    this.scheduleService.bookNow(this.appointment).subscribe(() => {
    }, () => {
    }, () => {
      // this.done = true;
    });
  }
}
