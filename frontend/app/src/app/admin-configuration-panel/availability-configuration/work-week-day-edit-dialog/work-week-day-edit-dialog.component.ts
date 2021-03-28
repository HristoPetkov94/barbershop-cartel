import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {WorkWeekDayModel} from '../../../models/work-week-day.model';

@Component({
  selector: 'app-work-week-day-edit-dialog',
  templateUrl: './work-week-day-edit-dialog.component.html',
  styleUrls: ['./work-week-day-edit-dialog.component.css']
})
export class WorkWeekDayEditDialogComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<WorkWeekDayEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkWeekDayModel[],
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {

    const arr = [];
    var i;
    for (i = 0; i < this.data.length; i++) {
      var item = this.data[i];
      var group = this.fb.group({
        id: [item.id],
        dayOfWeek: [item.dayOfWeek],
        from: [item.from],
        to: [item.to],
        notWorking: [item.notWorking]
      });

      arr.push(group);
    }

    this.myForm = this.fb.group({
        workingHours: this.fb.array(arr),
      }
    );

  }

  get workingHour() {
    return this.myForm.get('workingHours') as FormArray;
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
