import {Component, Inject, OnInit} from '@angular/core';
import {ScheduleService} from '../services/schedule.service';
import {MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialog, MatDialogRef} from '@angular/material';
import {AuthService, FacebookLoginProvider} from 'angularx-social-login';
import {ServicesService} from '../services/services.service';
import {BarberService} from '../services/barber.service';
import {Service} from '../interfaces/service';
import {Barber} from '../models/barber';

// TODO: Refactor everything here methods, split into components if you have to, refactor css to make it more readable, delete unused stuff.

interface SelectedTime {
  hour?: string;
  date?: string;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],

})
export class ScheduleComponent implements OnInit {
  private services: Service[];
  private barbers: Barber[];
  private date;

  private week: Week = {days: []};
  private selectedTime: SelectedTime;
  private selectedBarber;
  private selectedService;

  constructor(public dialog: MatDialog,
              private scheduleService: ScheduleService,
              private servicesService: ServicesService,
              private barberService: BarberService) {
  }

  ngOnInit() {
    this.barberService.getBarbers().subscribe(b => this.barbers = b);
    this.servicesService.getAllServices().subscribe(s => this.services = s);
  }

  isObjectEmpty(object): boolean {
    return object === undefined;
  }

  openDialog(): void {

    const time = this.selectedTime;
    const barber = this.selectedBarber;
    const service = this.selectedService;

    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '400px',
      data: {
        time,
        barber,
        service
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  setSelectedHour(hour, date) {
    const pickedTime = {hour, date};

    for (const d of this.week.days) {
      if (d.date === date) {
        for (const h of d.hours) {
          h.available = h === hour;
        }
      } else {
        for (const h of d.hours) {
          h.available = false;
        }
      }
    }

    this.selectedTime = pickedTime;
  }

  nextWeek() {
    this.scheduleService.nextWeek(this.week, this.selectedBarber).subscribe(week => this.week = week);
  }

  prevWeek() {
    this.scheduleService.prevWeek(this.week, this.selectedBarber).subscribe(week => this.week = week);
  }

  changeWeek(event: MatDatepickerInputEvent<Date>) {
    const d = new Date(event.value);
    console.log(d);
    this.scheduleService.getWeekByDate(d).subscribe(week => this.week = week);
  }

  getWeekForBarber(barber) {
    this.scheduleService.getWeek(barber).subscribe(week => {
      this.week = week;
    });
  }

  isAllOkay() {
    return this.selectedBarber === undefined || this.selectedService === undefined || this.selectedTime === undefined;
  }
}

@Component({
  selector: 'dialog-example-overview-dialog',
  templateUrl: 'dialog-example-overview-dialog.html',
  styleUrls: ['./schedule.component.css'],
})
export class DialogOverviewExampleDialogComponent {

  private selectedOption;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    private fbAuth: AuthService,
    private scheduleService: ScheduleService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  approveWithFb() {
    let fbUser = null;

    this.fbAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      v => {
        this.fbAuth.authState.subscribe(u => fbUser = u);

        const bookingRequest: BookRequest = {
          barberId: 1,
          serviceId: 1,
          hour: this.data.time.hour.hour,
          date: this.data.time.date,
          clientUsername: fbUser.name,
          clientEmail: fbUser.email,
        };

        // console.log(fbUser);
        this.scheduleService.bookNow(bookingRequest).subscribe(d => console.log('saved.'));
      }
    );

    this.onNoClick();
  }
}
