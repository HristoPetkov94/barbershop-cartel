import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Assignment} from '../../../models/assignment';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-assignment-edit-dialog',
  templateUrl: './assignment-edit-dialog.component.html',
  styleUrls: ['./assignment-edit-dialog.component.css']
})
export class AssignmentEditDialogComponent implements OnInit {
  myForm: FormGroup;

  private minServiceDuration = 30;
  public currency = 'лв.';
  public time = 'мин.';

  constructor(
    public dialogRef: MatDialogRef<AssignmentEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public assignment: Assignment,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
        id: this.assignment.id,
        serviceId: this.assignment.serviceId,
        barberId: this.assignment.barberId,
        duration: this.assignment.duration,
        price: this.assignment.price,
      }
    );

    this.dialogRef.beforeClosed().subscribe(data => {
      data.id = this.myForm.value.id;
      data.serviceId = this.myForm.value.serviceId;
      data.barberId = this.myForm.value.barberId;
      data.duration = this.myForm.value.duration;
      data.price = this.myForm.value.price;
    });
  }

  incrementDuration() {
    let currentDuration = this.myForm.value.duration;

    currentDuration += this.minServiceDuration;
    if (currentDuration >= 60) {
      return;
    }

    this.myForm.patchValue({
      duration: currentDuration
    });
  }

  decrementDuration() {

    let currentDuration: number = this.myForm.value.duration;

    currentDuration -= this.minServiceDuration;

    if (currentDuration < 0) {
      return;
    }

    this.myForm.patchValue({
      duration: currentDuration
    });
  }

  incrementPrice() {

    let currentPrice: number = this.myForm.value.price;

    currentPrice++;

    this.myForm.patchValue({
      price: currentPrice
    });
  }

  decrementPrice() {

    let currentPrice: number = this.myForm.value.price;

    currentPrice--;

    if (currentPrice < 0) {
      return;
    }

    this.myForm.patchValue({
      price: currentPrice
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
