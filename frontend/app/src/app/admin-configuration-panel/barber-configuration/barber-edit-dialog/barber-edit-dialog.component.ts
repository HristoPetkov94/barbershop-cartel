import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Barber} from '../../../models/barber.model';
import {ImageService} from '../../../services/image.service';


@Component({
  selector: 'app-barber-edit',
  templateUrl: './barber-edit-dialog.component.html',
  styleUrls: ['./barber-edit-dialog.component.css']
})
export class BarberEditDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BarberEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Barber,
    private imageService: ImageService) {
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
    this.data.picture = this.imageService.getDefaultBarberImage();
  }
}
