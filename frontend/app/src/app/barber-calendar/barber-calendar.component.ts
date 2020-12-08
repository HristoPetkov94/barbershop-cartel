import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScheduleService} from '../services/schedule.service';
import {Week} from '../models/week';
import {BarberBookNowPanelComponent} from '../barber-book-now-panel/barber-book-now-panel.component';
import {Barber} from '../models/barber';

@Component({
  selector: 'app-barber-calendar',
  templateUrl: './barber-calendar.component.html',
  styleUrls: ['./barber-calendar.component.css']
})
export class BarberCalendarComponent implements OnInit {

  public barber = new Barber();
  public hours = [];
  public week: Week;
  public firstDayOfWeek: Date;
  public today = new Date();

  private numberOfWeeks = 0;

  @Input()
  private inputBarber;

  @Output()
  private navigation = new EventEmitter<any>();

  constructor(private scheduleService: ScheduleService,
              private barberBookNowPanelComponent: BarberBookNowPanelComponent) {
  }

  ngOnInit() {

    // get selected barber
    this.barber = this.barberBookNowPanelComponent.barber;

    this.scheduleService.getCurrentWeek(this.barber).subscribe(week => {
      this.week = week;
      this.hours = this.week.week[0].hours;
    }, err => {
      console.log(err);
    }, () => {
      console.log(this.week);
      this.firstDayOfWeek = this.week.week[0].date;
    });
  }

  private getToday() {
    let dd;
    dd = String(this.today.getDate()).padStart(2, '0');

    let mm;
    mm = String(this.today.getMonth() + 1).padStart(2, '0');

    let yyyy;
    yyyy = this.today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

  previousWeek() {

    if (this.disablePreviousWeekButton()) {
      return;
    }

    this.numberOfWeeks--;
    const changedToPositiveNumber = this.numberOfWeeks * -1;

    this.scheduleService.getPreviousWeek(changedToPositiveNumber, this.barber).subscribe(week => {
      this.week = week;
    }, err => {
      console.log(err);
    }, () => {
      this.firstDayOfWeek = this.week.week[0].date;
    });
  }

  nextWeek() {

    if (this.disableNextWeekButton()) {
      return;
    }

    this.numberOfWeeks++;

    this.scheduleService.getNextWeek(this.numberOfWeeks, this.barber).subscribe(week => {
        this.week = week;
      },
      err => {
        console.log(err);
      }, () => {
        this.firstDayOfWeek = this.week.week[0].date;
      }
    );
  }

  disablePreviousWeekButton() {
    // limitation you cannot get back more than 1 week
    return this.numberOfWeeks <= -1;
  }

  disableNextWeekButton() {
    // limitation you cannot get to see more than 3 weeks
    return this.numberOfWeeks >= 3;
  }

  getHoursForDay(day) {
    this.firstDayOfWeek = day.date;
    this.hours = day.hours;
  }

  chooseDateTime(hour) {

    console.log(hour);

    const datetime = {
      date: this.firstDayOfWeek,
      hour
    };

    this.navigation.emit(datetime);
  }
}
