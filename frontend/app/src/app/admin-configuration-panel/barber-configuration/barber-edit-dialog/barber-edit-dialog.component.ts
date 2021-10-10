import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Barber} from '../../../models/barber.model';
import {ImageService} from '../../../services/image.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LanguagePipe} from '../../../pipes/language-pipe';

@Component({
  selector: 'app-barber-edit',
  templateUrl: './barber-edit-dialog.component.html',
  styleUrls: ['./barber-edit-dialog.component.css']
})
export class BarberEditDialogComponent implements OnInit {

  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  myForm: FormGroup;
  @ViewChild('chooseFile') public chooseFile: ElementRef;

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
    @Inject(MAT_DIALOG_DATA) public barber: Barber,
    private imageService: ImageService,
    private languagePipe: LanguagePipe,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {

    const firstName = this.languagePipe.transform(this.barber.firstName);
    const lastName = this.languagePipe.transform(this.barber.lastName);
    const description = this.languagePipe.transform(this.barber.description);

    this.myForm = this.fb.group({
        id: this.barber.id,
        firstName: [firstName, [Validators.required]],
        lastName: [lastName, [Validators.required]],
        instagram: [this.barber.instagram, [Validators.pattern(this.reg)]],
        facebook: [this.barber.facebook, [Validators.pattern(this.reg)]],
        description: [description, [Validators.maxLength(255)]]
      }
    );

    this.dialogRef.beforeClosed().subscribe(value => {
      // onCancel value is null
      if (value != null) {
        value.id = this.myForm.value.id;
        value.firstName[this.languagePipe.language] = this.myForm.value.firstName;
        value.lastName[this.languagePipe.language] = this.myForm.value.lastName;
        value.instagram = this.myForm.value.instagram;
        value.facebook = this.myForm.value.facebook;
        value.description[this.languagePipe.language] = this.myForm.value.description;
      }
    });
  }

  changed(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.barber.picture = reader.result.toString();
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  removeImage() {
    this.barber.picture = this.imageService.getDefaultBarberImage();
  }

  changeImage() {
    this.chooseFile.nativeElement.click();
  }
}
