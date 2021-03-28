import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {WorkWeekDayService} from '../../../services/work-week-day.service';
import {WorkWeekDayModel} from '../../../models/work-week-day.model';
import {MatDialog} from '@angular/material/dialog';
import {WorkWeekDayEditDialogComponent} from '../work-week-day-edit-dialog/work-week-day-edit-dialog.component';
import {NotificationComponent} from '../../../notification/notification.component';

@Component({
  selector: 'app-work-week-day-view',
  templateUrl: './work-week-day-view.component.html',
  styleUrls: ['./work-week-day-view.component.css']
})
export class WorkWeekDayViewComponent implements OnInit, OnChanges {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  @Input()
  private barberId;
  public workingHours: WorkWeekDayModel[];


  constructor(private workWeekDayService: WorkWeekDayService,
              private dialog: MatDialog) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.workWeekDayService.getAllByBarberId(this.barberId).subscribe(data => {
      this.workingHours = data;
    });
  }

  ngOnInit(): void {
    this.workWeekDayService.getAllByBarberId(this.barberId).subscribe(data => {
      this.workingHours = data;
    });
  }

  edit() {
    const dialogRef = this.dialog.open(WorkWeekDayEditDialogComponent, {
      width: '500px',
      data: Object.assign([], this.workingHours)
    });

    dialogRef.afterClosed().subscribe(result => {
      function extracted(arr) {
        let i;
        for (i = 0; i < arr.length; i++) {
          const item = arr[i];
          const edited = result.controls.workingHours.value[i];

          item.notWorking = edited.notWorking;
          item.from = edited.from;
          item.to = edited.to;
        }
      }

      if (result) {
        const arr = Object.assign([], this.workingHours);

        extracted(arr);

        this.workWeekDayService.updateWorkingHoursModels(arr).subscribe(data => {
          },
          (err) => {
            this.notification.showMessage('Working have has not been updated successfully.', 'warn');
          },
          () => {

            extracted(this.workingHours);
            this.notification.showMessage('Working have has been updated successfully.', 'success');
          }
        );
      }
    });
  }
}
