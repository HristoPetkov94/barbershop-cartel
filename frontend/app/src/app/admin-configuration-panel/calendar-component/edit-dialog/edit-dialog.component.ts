import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppointmentModel} from '../../../models/appointment.model';
import dayjsPluginUTC from 'dayjs-plugin-utc';
import * as dayjs from 'dayjs';
import {AppointmentService} from '../../../services/appointment.service';
import {AssignmentService} from '../../../services/assignment.service';
import {Observable} from 'rxjs';
import {Assignment} from '../../../models/assignment';
import {ServiceService} from '../../../services/service.service';
import {Service} from '../../../models/service';

dayjs.extend(dayjsPluginUTC);

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  format = 'YYYY-MM-DDTHH:mm:ss';

  myForm: FormGroup;

  selected =  { startDate: this.appointment.start, endDate: this.appointment.end };

  services = [];

  assignments$: Observable<Assignment[]>;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private appointmentService: AppointmentService,
    private assignmentService: AssignmentService,
    private serviceService: ServiceService,
    @Inject(MAT_DIALOG_DATA) public appointment: AppointmentModel,
    private fb: FormBuilder
  ) {
  }

  getService(assignmentId): Service {
    return this.services.find(s => s.id === +assignmentId);
  }

  get assignmentId() {
    return this.myForm.value.assignmentId;
  }

  ngOnInit(): void {

    this.assignments$ = this.assignmentService.getAssignmentsByBarberId(this.appointment.barberId);

    this.serviceService.getServices().subscribe(services => {
      this.services = services;
    });

    this.myForm = this.fb.group({
        id: this.appointment.id,
        barberId: this.appointment.barberId,
        assignmentId: this.appointment.assignmentId,
        noShow: this.appointment.noShow,
        email: this.appointment.email,
        phone: this.appointment.phone,
        name: this.appointment.name,
        start: this.appointment.start,
        end: this.appointment.end,
        title: this.appointment.title
      }
    );

    this.dialogRef.beforeClosed().subscribe(data => {
      data.value.id = this.myForm.value.id;
      data.value.barberId = this.myForm.value.barberId;
      data.value.assignmentId = this.myForm.value.assignmentId;
      data.value.showedUp = this.myForm.value.showedUp;
      data.value.email = this.myForm.value.email;
      data.value.phone = this.myForm.value.phone;
      data.value.start = dayjs(this.selected.startDate).format(this.format);
      data.value.end = dayjs(this.selected.endDate).format(this.format);
      data.value.title = this.myForm.value.title;

      console.log(data);
    });

  }

  delete() {

    this.appointmentService.delete(this.myForm.value.id).subscribe(result => {
        this.dialogRef.close();
      }
    );
  }
}
