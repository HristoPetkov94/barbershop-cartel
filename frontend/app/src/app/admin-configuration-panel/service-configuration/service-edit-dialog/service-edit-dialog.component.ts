import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ImageService} from '../../../services/image.service';
import {Service} from '../../../models/service';
import {LanguagePipe} from '../../../pipes/language-pipe';

@Component({
  selector: 'app-service-edit-dialog',
  templateUrl: './service-edit-dialog.component.html',
  styleUrls: ['./service-edit-dialog.component.css', '../../shared-styles/shared.css']
})
export class ServiceEditDialogComponent implements OnInit {

  @ViewChild('chooseFile') public chooseFile: ElementRef;

  myForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ServiceEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public service: Service,
    private imageService: ImageService,
    private fb: FormBuilder,
    private languagePipe: LanguagePipe) {
  }

  ngOnInit(): void {

    const title = this.languagePipe.transform(this.service.serviceTitle);
    const description = this.languagePipe.transform(this.service.description);

    this.myForm = this.fb.group({
        id: this.service.id,
        serviceTitle: [title, [Validators.required]],
        description: [description, [Validators.maxLength(255)]]
      }
    );
  }

  get description() {
    return this.myForm.get('description');
  }

  get isCreatingService() {
    return this.myForm.get('id').value === null;
  }

  changed(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.service.picture = reader.result.toString();
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.service.id = this.myForm.value.id;
    this.service.serviceTitle[this.languagePipe.language] = this.myForm.value.serviceTitle;
    this.service.description[this.languagePipe.language] = this.myForm.value.description;
  }

  removeImage() {
    this.service.picture = this.imageService.getDefaultServiceImage();
  }

  changeImage() {
    this.chooseFile.nativeElement.click();
  }
}
