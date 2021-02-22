import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Barber} from '../../../models/barber.model';
import {ImageService} from '../../../services/image.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-barber-edit',
  templateUrl: './barber-edit-dialog.component.html',
  styleUrls: ['./barber-edit-dialog.component.css']
})
export class BarberEditDialogComponent implements OnInit {

  myForm: FormGroup;
  @ViewChild('chooseFile') public chooseFile: ElementRef;

  get description(){
    return this.myForm.get('description');
  }

  constructor(
    public dialogRef: MatDialogRef<BarberEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Barber,
    private imageService: ImageService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
        id: this.data.id,
        firstName: [this.data.firstName, [Validators.required]],
        lastName: [this.data.lastName, [Validators.required]],
        instagram: this.data.instagram,
        facebook: this.data.facebook,
        description: [this.data.description, [Validators.maxLength(255)]]
      }
    );


    this.dialogRef.beforeClosed().subscribe(value => {
      value.id = this.myForm.value.id;
      value.firstName = this.myForm.value.firstName;
      value.lastName = this.myForm.value.lastName;
      value.instagram = this.myForm.value.instagram;
      value.facebook = this.myForm.value.facebook;
      value.description = this.myForm.value.description;
    });
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

  changeImage() {
    this.chooseFile.nativeElement.click();
  }
}
