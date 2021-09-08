import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Assignment} from '../../../../models/assignment';
import {AssignmentService} from '../../../../services/assignment.service';
import {ChangeStepRequest} from '../../stepper/change-step-request.model';
import {AppointmentService} from '../../../../services/appointment.service';
import {StepEnum} from '../../stepper/step.enum';
import {Day} from '../../../../interfaces/day';
import {AppointmentDaysService} from '../../../../services/appointment-days.service';
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);

@Component({
  selector: 'app-date-step',
  templateUrl: './date-step.component.html',
  styleUrls: ['./date-step.component.css']
})
export class DateStepComponent implements OnInit {

  @Input() stepperData;
  @Output() changeStep = new EventEmitter<ChangeStepRequest>();

  private numberOfWeeks: number = 0;

  assignments: Assignment[];

  public hours: string[] = [];
  public week: Day[];

  public today;

  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private router: Router,
    private scheduleService: AppointmentService,
    private appointmentDaysService: AppointmentDaysService,
    @Inject(LOCALE_ID) public locale: string,
  ) {
  }

  get assignmentId() {
    return this.stepperData.assignmentId;
  }

  ngOnInit(): void {

    this.currentWeek();
  }

  previousWeek() {

    this.numberOfWeeks--;

    this.currentWeek();
  }

  nextWeek() {

    this.numberOfWeeks++;

    this.currentWeek();
  }

  getFrom() {

    const from = dayjs().weekday(1).startOf('day').add(this.numberOfWeeks * 7, 'day');

    return from;
  }

  getTo() {

    const to = this.getFrom().add(6, 'day');
    console.log(to);

    return to;
  }

  currentWeek() {
    this.appointmentDaysService.get(this.assignmentId, this.getFrom(), this.getTo()).subscribe(week => {
      this.week = week;

      const today = week.find(d => d.today === true);

      if (today) {
        today.active = 'selected';

        this.today = today.date;
        this.hours = today.hours;
      }
    }, err => {
      console.log(err);
    });
  }

  get isPreviousWeekButtonDisabled() {
    // limitation you cannot get past weeks
    return this.numberOfWeeks <= 0;
  }

  get isNextWeekButtonDisabled() {
    // limitation you cannot get to see more than 5 weeks
    return this.numberOfWeeks >= 5;
  }

  getHoursForDay(day) {
    this.today = day.date;
    this.hours = day.hours;

    this.selectDay(day);
  }

  selectDay(day) {
    for (const d of this.week) {
      d.active = '';
    }

    day.active = 'selected';
  }

  next(hour) {
    // set data
    this.stepperData.date = this.today;
    this.stepperData.hour = hour;

    console.log('from date to finish');
    // this.stepDataObject.barberId = barber.id;

    const request: ChangeStepRequest = {
      label: `${this.today} ${hour}`,
      step: StepEnum.FINISH_STEP
    };

    this.changeStep.emit(request);
  }
}
