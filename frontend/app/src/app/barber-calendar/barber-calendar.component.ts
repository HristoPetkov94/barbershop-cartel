import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {ScheduleService} from '../services/schedule.service';
import {Week} from '../models/week.model';
import {Barber} from '../models/barber.model';
import {Service} from '../interfaces/service';
import {LOCALE_ID, Inject} from '@angular/core';
import {fade} from '../views/animations/fade';

@Component({
  selector: 'app-barber-calendar',
  templateUrl: './barber-calendar.component.html',
  styleUrls: ['./barber-calendar.component.css'], animations: [
    fade
  ]
})
export class BarberCalendarComponent implements OnInit {

  public hours = [];
  public week: Week;

  public today;

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

      const today = week.days.find(d => d.today === true);

      today.active = 'selected';

      this.today = today.date;
      this.hours = today.hours;

    }, err => {
      console.log(err);
    });
  }

  previousWeek() {
    if (this.disablePreviousWeekButton()) {
      return;
    }

    this.numberOfWeeks--;
    const changedToPositiveNumber = this.numberOfWeeks * -1;

    this.scheduleService.getPreviousWeek(changedToPositiveNumber, this.barber, this.service).subscribe(week => {
      this.week = week;

      const today = week.days.find(d => d.date === this.today);

      if (today !== undefined) {
        today.active = 'selected';
      }

      // this.today = today.date;
    }, err => {
      console.log(err);
    });
  }

  nextWeek() {
    if (this.disableNextWeekButton()) {
      return;
    }

    this.numberOfWeeks++;

    this.scheduleService.getNextWeek(this.numberOfWeeks, this.barber, this.service).subscribe(week => {
        this.week = week;

        const today = week.days.find(d => d.date === this.today);

        if (today !== undefined) {
          today.active = 'selected';
        }

        // this.today = today.date;
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
    this.today = day.date;
    this.hours = day.hours;

    this.selectDay(day);
  }

  selectDay(day) {
    for (const d of this.week.days) {
      d.active = '';
    }

    day.active = 'selected';
  }

  chooseDateTime(hour) {

    const datetime = {
      date: this.today,
      hour
    };

    this.navigation.emit(datetime);
  }
}
