import {Component, ElementRef, Inject, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Barber} from '../../../models/barber.model';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'app-barber-edit',
  templateUrl: './barber-edit.component.html',
  styleUrls: ['./barber-edit.component.css']
})
export class BarberEditComponent {

  private url = environment.apiUrl;

  constructor(
    public dialogRef: MatDialogRef<BarberEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Barber) {
  }

  changed(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.data.picture = reader.result.toString();
      console.log('picture: ', this.data.picture);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeImage() {
    this.data.picture = this.url + '/images/default-profile-picture.png';
  }
}
