import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Assignment} from '../../../../models/assignment';
import {AssignmentService} from '../../../../services/assignment.service';
import {ChangeStepRequest} from '../../stepper/change-step-request.model';
import {AppointmentService} from '../../../../services/appointment.service';
import {Week} from '../../../../models/week.model';
import {StepEnum} from '../../stepper/step.enum';

@Component({
  selector: 'app-date-step',
  templateUrl: './date-step.component.html',
  styleUrls: ['./date-step.component.css']
})
export class DateStepComponent implements OnInit {

  @Input() stepperData;
  @Output() changeStep = new EventEmitter<ChangeStepRequest>();

  private numberOfWeeks = 0;

  assignments: Assignment[];

  public hours = [];
  public week: Week;

  public today;

  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private router: Router,
    private scheduleService: AppointmentService,
    @Inject(LOCALE_ID) public locale: string,
  ) {
  }

  get assignmentId() {
    return this.stepperData.assignmentId;
  }

  ngOnInit(): void {

    this.scheduleService.getCurrentWeek(this.assignmentId).subscribe(week => {
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

    this.numberOfWeeks--;
    const changedToPositiveNumber = -this.numberOfWeeks;

    this.scheduleService.getPreviousWeek(changedToPositiveNumber, this.assignmentId).subscribe(week => {
      this.week = week;

      const today = week.days.find(d => d.date === this.today);

      if (today !== undefined) {
        today.active = 'selected';
      }

    }, err => {
      console.log(err);
    });
  }

  nextWeek() {

    this.numberOfWeeks++;

    this.scheduleService.getNextWeek(this.numberOfWeeks, this.assignmentId).subscribe(week => {
        this.week = week;

        const today = week.days.find(d => d.date === this.today);

        if (today !== undefined) {
          today.active = 'selected';
        }

      },
      err => {
        console.log(err);
      }
    );
  }

  get isPreviousWeekButtonDisabled() {
    // limitation you cannot get past weeks
    return this.numberOfWeeks <= 0;
  }

  get isNextWeekButtonDisabled() {
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
