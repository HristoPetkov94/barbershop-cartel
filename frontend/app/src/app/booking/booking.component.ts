import {Component, OnInit} from '@angular/core';
import {Barber} from '../models/barber';
import {BarberService} from '../services/barber.service';
import {Service} from '../interfaces/service';
import {ScheduleService} from '../services/schedule.service';
import {ServicesService} from '../services/services.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  private week: Week;
  private month: string;
  private hours = [];
  private barbers: Barber[] = new Array<Barber>();

  private selectedDay: number;

  private selectedBarber: Barber;
  private selectedService: Service;

  private monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(private scheduleService: ScheduleService,
              private servicesService: ServicesService,
              private barberService: BarberService) {
  }

  ngOnInit() {
    this.barberService.getBarbers().subscribe(b => this.barbers = b);
  }

  generateDataForBarber(event) {
    if (event.selectedIndex === 2) {
      this.scheduleService.getWeek(this.selectedBarber).subscribe(week => {
        this.week = week;
        this.hours = this.week.days[0].hours;
      }, err => {
        console.log(err);
      }, () => {
        const firstDay = this.week.days[0];
        console.log(firstDay);
        const m = new Date(firstDay.date).getMonth();
        this.month = this.monthNames[m];
      });
    }
  }

  next() {
    this.scheduleService.nextWeek(this.week, this.selectedBarber).subscribe(week => {
        this.week = week;
      },
      err => {
        console.log(err);
      }, () => {
        const firstDay = this.week.days[0];
        console.log(firstDay);
        const m = new Date(firstDay.date).getMonth();
        this.month = this.monthNames[m];
      }
    )
    ;
  }

  prev() {
    this.scheduleService.prevWeek(this.week, this.selectedBarber).subscribe(week => {
      this.week = week;
    }, err => {
      console.log(err);
    }, () => {
      const firstDay = this.week.days[0];
      console.log(firstDay);
      const m = new Date(firstDay.date).getMonth();
      this.month = this.monthNames[m];
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
    console.log(day);

    this.hours = day.hours;
  }
}
