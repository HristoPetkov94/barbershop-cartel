import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ImageService} from '../../../services/image.service';
import {Service} from '../../../models/service';

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
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
        id: this.service.id,
        serviceTitle: [this.service.serviceTitle, [Validators.required]],
        description: [this.service.description, [Validators.required]]
      }
    );

    this.dialogRef.beforeClosed().subscribe(data => {
      data.id = this.myForm.value.id;
      data.serviceTitle = this.myForm.value.serviceTitle;
      data.description = this.myForm.value.description;
    });
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeImage() {
    this.service.picture = this.imageService.getDefaultServiceImage();
  }

  changeImage() {
    this.chooseFile.nativeElement.click();
  }
}
