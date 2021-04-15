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
  public assignmentId;

  @Input() stepperData;
  @Output() changeStep = new EventEmitter<ChangeStepRequest>();

  assignments: Assignment[];

  public hours = [];
  public week: Week;

  public today;

  private numberOfWeeks = 0;

  @Output()
  private navigation = new EventEmitter<any>();


  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private router: Router,
    private scheduleService: AppointmentService,
    @Inject(LOCALE_ID) public locale: string,
  ) {
  }

  ngOnInit(): void {
    console.log('date step');
    // const routeParams = this.route.snapshot.paramMap;
    // this.assignmentId = Number(routeParams.get('assignmentId'));
    this.assignmentId = this.stepperData.assignmentId;

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
    if (this.disablePreviousWeekButton()) {
      return;
    }

    this.numberOfWeeks--;
    const changedToPositiveNumber = this.numberOfWeeks * -1;

    this.scheduleService.getPreviousWeek(changedToPositiveNumber, this.assignmentId).subscribe(week => {
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

    this.scheduleService.getNextWeek(this.numberOfWeeks, this.assignmentId).subscribe(week => {
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
