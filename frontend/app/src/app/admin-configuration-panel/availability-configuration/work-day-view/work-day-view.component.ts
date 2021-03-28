import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {WorkDayService} from '../../../services/work-day.service';
import {WorkDayModel} from '../../../models/work-day.model';
import {MatDialog} from '@angular/material/dialog';
import {NotificationComponent} from '../../../notification/notification.component';
import {WorkDayEditDialogComponent} from '../work-day-edit-dialog/work-day-edit-dialog.component';

@Component({
  selector: 'app-work-day-view',
  templateUrl: './work-day-view.component.html',
  styleUrls: ['./work-day-view.component.css']
})
export class WorkDayViewComponent implements OnInit, OnChanges {

  @Input()
  private barberId;

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  workDays: WorkDayModel[];

  constructor(private workDayService: WorkDayService,
              private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.refresh();
  }

  ngOnInit(): void {
    this.refresh();
  }

  private refresh() {
    this.workDayService.getAllByBarberId(this.barberId).subscribe(data => {
      this.workDays = data;
    });
  }

  edit() {
    const dialogRef = this.dialog.open(WorkDayEditDialogComponent, {
      width: '800px',
      data: [this.barberId, Object.assign([], this.workDays)],
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.workDayService.updateWorkingHoursModels(result.value.workDays).subscribe(data => {
            this.workDays = data;
          },
          (err) => {
            this.notification.showMessage('Working have has not been updated successfully.', 'warn');
          },
          () => {
            this.notification.showMessage('Working have has been updated successfully.', 'success');
          }
        );
      }
    });
  }
}
