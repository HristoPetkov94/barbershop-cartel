import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Assignment} from '../../../models/assignment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GlobalConstants} from '../../../common/global.constants';

@Component({
  selector: 'app-assignment-edit-dialog',
  templateUrl: './assignment-edit-dialog.component.html',
  styleUrls: ['./assignment-edit-dialog.component.css']
})
export class AssignmentEditDialogComponent implements OnInit {
  myForm: FormGroup;

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

  checkServiceDurationValid(duration) {
    if (duration > GlobalConstants.MAX_SERVICE_DURATION) {
      return false;
    }

    if (duration < GlobalConstants.MIN_SERVICE_DURATION) {
      return false;
    }

    return true;
  }

  changeDurationBySteps(stepChange) {
    let currentDuration = this.myForm.value.duration;

    currentDuration = currentDuration + stepChange * GlobalConstants.SERVICE_DURATION_STEP;
    if (!this.checkServiceDurationValid(currentDuration)) {
      return;
    }

    this.myForm.patchValue({
      duration: currentDuration
    });
  }

  checkServicePriceValid(price) {
    return price > 0;
  }

  changePriceBySteps(stepChange) {
    let currentPrice: number = this.myForm.value.price;

    currentPrice = currentPrice + stepChange;

    if (!this.checkServicePriceValid(currentPrice)) {
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
