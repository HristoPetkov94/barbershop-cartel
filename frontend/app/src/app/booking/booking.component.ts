import {Component, Inject, Input, OnInit} from '@angular/core';
import {Barber} from '../models/barber';
import {BarberService} from '../services/barber.service';
import {Service} from '../interfaces/service';
import {ScheduleService} from '../services/schedule.service';
import {ServicesService} from '../services/services.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import {ScheduleConfigService} from '../services/schedule-config.service';
import {ScheduleConfig} from '../interfaces/schedule-config';
import {Week} from '../models/week';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  public hours = [];
  public week: Week;
  public firstDayOfWeek: Date;

  @Input()
  barbers: Barber[];

  @Input()
  editable: boolean;

  public configs: ScheduleConfig[] = new Array<ScheduleConfig>();

  public selectedBarber: Barber;
  public selectedService: Service;

  constructor(private scheduleService: ScheduleService,
              private servicesService: ServicesService,
              private barberService: BarberService,
              private configService: ScheduleConfigService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.barberService.getBarbers().subscribe(b => this.barbers = b);
  }

  generateDataForBarber(event) {
    if (event.selectedIndex === 2) {
      this.configService.getBarberConfigs(this.selectedBarber.id).subscribe(c => this.configs = c);
    }
  }

  next() {
    this.scheduleService.getNextWeek(null, this.selectedBarber).subscribe(week => {
        this.week = week;
      },
      err => {
        console.log(err);
      }, () => {
        this.firstDayOfWeek = this.week.week[0].date;
      }
    )
    ;
  }

  prev() {
    this.scheduleService.getPreviousWeek(null, this.selectedBarber).subscribe(week => {
      this.week = week;
    }, err => {
      console.log(err);
    }, () => {
      this.firstDayOfWeek = this.week.week[0].date;
    });
  }

  selectBarber(barber: Barber) {
    this.selectedBarber = barber;

    console.log('selected barber: ', this.selectedBarber);
  }

  selectService(service: Service) {
    this.selectedService = service;

    console.log('selected service: ', this.selectedService);
  }

  getHoursForDay(day) {
    this.firstDayOfWeek = day.date;
    this.hours = day.hours;
  }

  openDialog(): void {
    const config: ScheduleConfig = new ScheduleConfig(0, '', '', '', false);

    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '500px',
      data: config
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}

@Component({
  selector: 'dialog-example-overview-dialog',
  templateUrl: 'dialog-example-overview-dialog.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingDialogComponent {

  public times = [];

  date = new FormControl(new Date());

  dateFrom = new FormControl(new Date());
  dateTo = new FormControl(new Date());

  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ScheduleConfig,
    private scheduleConfigService: ScheduleConfigService) {

    console.log(data);

    const minutes = ['00', '30'];

    for (let i = 0; i < 24; i++) {
      for (const minute of minutes) {
        let time = i + ':' + minute;

        if (i < 10) {
          time = '0' + time;
        }

        this.times.push(time);
      }
    }
  }

  save() {
    let dFrom = new Date(this.dateFrom.value);
    const dTo = new Date(this.dateTo.value);
    while (dFrom !== dTo) {
      this.data.date = dFrom.toDateString();

      this.scheduleConfigService.saveConfiguration(this.data).subscribe(d => console.log(d), error1 => console.log(error1));

      dFrom = new Date(dFrom.getDate() + 1);
    }

    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
