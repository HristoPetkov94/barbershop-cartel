import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppointmentModel} from '../../../models/appointment.model';
import dayjsPluginUTC from 'dayjs-plugin-utc'
import * as dayjs from 'dayjs';
import {AppointmentService} from '../../../services/appointment.service';

dayjs.extend(dayjsPluginUTC)

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  format: string = "YYYY-MM-DDTHH:mm:ss"

  myForm: FormGroup;

  selected =  { }

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private appointmentService: AppointmentService,
    @Inject(MAT_DIALOG_DATA) public appointment: AppointmentModel,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
        id: this.appointment.id,
        barberId: this.appointment.barberId,
        assignmentId: this.appointment.assignmentId,
        email: this.appointment.email,
        phone: this.appointment.phone,
        name: this.appointment.name,
        start: this.appointment.start,
        end: this.appointment.end,
        title: this.appointment.title
      }
    );

    this.selected = { "startDate": this.appointment.start, "endDate": this.appointment.end }

    this.dialogRef.beforeClosed().subscribe(data => {
      data.value.id = this.myForm.value.id;
      data.value.barberId = this.myForm.value.barberId;
      data.value.assignmentId = this.myForm.value.assignmentId;
      data.value.email = this.myForm.value.email;
      data.value.phone = this.myForm.value.phone;
      data.value.start = this.selected["startDate"].format(this.format);
      data.value.end = this.selected["endDate"].format(this.format);
      data.value.title = this.myForm.value.title;

      console.log(this.selected);
    });

  }

  delete() {

    this.appointmentService.delete(this.myForm.value.id).subscribe(result => {
        this.dialogRef.close();
      }
    )
  }
}
