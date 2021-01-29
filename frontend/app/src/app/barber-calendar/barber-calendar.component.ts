import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScheduleService} from '../services/schedule.service';
import {Week} from '../models/week.model';
import {Barber} from '../models/barber.model';
import {Service} from '../interfaces/service';
import {formatDate} from '@angular/common';
import {LOCALE_ID, Inject} from '@angular/core';

@Component({
  selector: 'app-barber-calendar',
  templateUrl: './barber-calendar.component.html',
  styleUrls: ['./barber-calendar.component.css']
})
export class BarberCalendarComponent implements OnInit {

  public hours = [];
  public week: Week;
  public today = new Date();
  public currentDay: Date;
  public selectedDay = this.today;
  private numberOfWeeks = 0;

  @Input()
  private barber: Barber;

  @Input()
  private service: Service;

  @Output()
  private navigation = new EventEmitter<any>();

  constructor(private scheduleService: ScheduleService,
              @Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit() {

    this.scheduleService.getCurrentWeek(this.barber, this.service).subscribe(week => {
      this.week = week;

      // this is how we show the hours for current day in the calendar
      for (let i = 0; i < this.week.week.length; i++) {

        const currentDay = this.week.week[i];

        if (currentDay.date.toString() === this.getToday()) {
          this.hours = this.week.week[i].hours;
          this.currentDay = currentDay.date;
        }
      }
    }, err => {
      console.log(err);
    });
  }

  public getToday() {
    return formatDate(new Date(), 'yyyy-MM-dd', this.locale);
  }

  previousWeek() {

    if (this.disablePreviousWeekButton()) {
      return;
    }

    this.numberOfWeeks--;
    const changedToPositiveNumber = this.numberOfWeeks * -1;

    this.today.setDate(this.today.getDate() - 7);

    this.scheduleService.getPreviousWeek(changedToPositiveNumber, this.barber, this.service).subscribe(week => {
      this.week = week;
    }, err => {
      console.log(err);
    });
  }

  nextWeek() {

    if (this.disableNextWeekButton()) {
      return;
    }

    this.numberOfWeeks++;

    this.today.setDate(this.today.getDate() + 7);

    this.scheduleService.getNextWeek(this.numberOfWeeks, this.barber, this.service).subscribe(week => {
        this.week = week;
      },
      err => {
        console.log(err);
      }
    );
  }

  disablePreviousWeekButton() {
    // limitation you cannot get past weeks
    return this.numberOfWeeks <= 0;
  }

  disableNextWeekButton() {
    // limitation you cannot get to see more than 3 weeks
    return this.numberOfWeeks >= 3;
  }

  getHoursForDay(day) {
    this.currentDay = day.date;
    this.selectedDay = day.date;
    this.hours = day.hours;
  }

  chooseDateTime(hour) {

    const datetime = {
      date: this.currentDay,
      hour
    };

    this.navigation.emit(datetime);
  }
}
