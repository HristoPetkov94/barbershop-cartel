import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Barber} from '../../../models/barber.model';
import {ImageService} from '../../../services/image.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {getCookie} from '../../../utils/cookie.utils';

@Component({
  selector: 'app-barber-edit',
  templateUrl: './barber-edit-dialog.component.html',
  styleUrls: ['./barber-edit-dialog.component.css']
})
export class BarberEditDialogComponent implements OnInit {

  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  myForm: FormGroup;
  @ViewChild('chooseFile') public chooseFile: ElementRef;
  public language: string;

  get facebook() {
    return this.myForm.get('facebook');
  }

  get description() {
    return this.myForm.get('description');
  }

  get instagram() {
    return this.myForm.get('instagram');
  }

  get isCreatingBarber() {
    return this.myForm.get('id').value === null;
  }

  constructor(
    public dialogRef: MatDialogRef<BarberEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Barber,
    private imageService: ImageService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.language = getCookie('lang');

    this.myForm = this.fb.group({
        id: this.data.id,
        firstName: [this.data.firstName[this.language], [Validators.required]],
        lastName: [this.data.lastName[this.language], [Validators.required]],
        instagram: [this.data.instagram, [Validators.pattern(this.reg)]],
        facebook: [this.data.facebook, [Validators.pattern(this.reg)]],
        description: [this.data.description[this.language], [Validators.maxLength(255)]]
      }
    );


    this.dialogRef.beforeClosed().subscribe(value => {
      value.id = this.myForm.value.id;
      value.firstName[this.language] = this.myForm.value.firstName;
      value.lastName[this.language] = this.myForm.value.lastName;
      value.instagram = this.myForm.value.instagram;
      value.facebook = this.myForm.value.facebook;
      value.description[this.language] = this.myForm.value.description;
    });
  }

  changed(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.data.picture = reader.result.toString();
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  onCancel(): void {
    console.log(this.data.firstName);
    this.dialogRef.close();
  }

  removeImage() {
    this.data.picture = this.imageService.getDefaultBarberImage();
  }

  changeImage() {
    this.chooseFile.nativeElement.click();
  }
}
