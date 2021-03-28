import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-work-day-edit-dialog',
  templateUrl: './work-day-edit-dialog.component.html',
  styleUrls: ['./work-day-edit-dialog.component.css']
})
export class WorkDayEditDialogComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<WorkDayEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {

    const arr = [];
    var i;
    for (i = 0; i < this.data[1].length; i++) {
      var item = this.data[1][i];
      var group = this.fb.group({
        id: [item.id],
        day: [item.day],
        from: [item.from],
        to: [item.to],
        notWorking: [item.notWorking],
        barberId: [item.barberId]
      });

      arr.push(group);
    }

    this.myForm = this.fb.group({
      workDays: this.fb.array(arr),
      }
    );

  }

  get workDays() {
    return this.myForm.get('workDays') as FormArray;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  add() {
    const group = this.fb.group({
      id: [],
      day: [new Date().toISOString().slice(0, 10)],
      from: ['08:00'],
      to: ['10:00'],
      notWorking: [false],
      barberId: this.data[0]
    });

    this.workDays.push(group);
  }

  delete(i: number) {
    this.workDays.removeAt(i);
  }
}
