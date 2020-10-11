import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScheduleService} from '../services/schedule.service';
import {Week} from "../models/week";

@Component({
  selector: 'app-barber-calendar',
  templateUrl: './barber-calendar.component.html',
  styleUrls: ['./barber-calendar.component.css']
})
export class BarberCalendarComponent implements OnInit {

  public hours = [];
  public week: Week;
  public firstDayOfWeek: Date;

  @Input()
  private inputBarber;

  @Output()
  private navigation = new EventEmitter<any>();

  private barber = {id: 2};

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit() {
    this.scheduleService.getWeek(this.barber).subscribe(week => {
      this.week = week;
      this.hours = this.week.days[0].hours;
    }, err => {
      console.log(err);
    }, () => {
      this.firstDayOfWeek = this.week.days[0].date;
    });
  }

  next() {
    this.scheduleService.nextWeek(this.week, this.barber).subscribe(week => {
        this.week = week;
      },
      err => {
        console.log(err);
      }, () => {
        this.firstDayOfWeek = this.week.days[0].date;
      }
    );
  }

  prev() {
    this.scheduleService.prevWeek(this.week, this.barber).subscribe(week => {
      this.week = week;
    }, err => {
      console.log(err);
    }, () => {
      this.firstDayOfWeek = this.week.days[0].date;
    });
  }

  getHoursForDay(day) {
    this.firstDayOfWeek = day.date;
    this.hours = day.hours;
  }

  chooseDateTime(hour) {
    const datetime = {
      date: this.firstDayOfWeek,
      hour
    };

    this.navigation.emit(datetime);
  }
}
