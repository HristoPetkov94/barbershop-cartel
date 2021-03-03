import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ImageService} from '../../../services/image.service';
import {Service} from '../../../interfaces/service';

@Component({
  selector: 'app-service-edit-dialog',
  templateUrl: './service-edit-dialog.component.html',
  styleUrls: ['./service-edit-dialog.component.css', '../../shared-styles/shared.css']
})
export class ServiceEditDialogComponent implements OnInit {

  @ViewChild('chooseFile') public chooseFile: ElementRef;

  myForm: FormGroup;
  private minServiceDuration = 30;

  constructor(
    public dialogRef: MatDialogRef<ServiceEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public service: Service,
    private imageService: ImageService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
        id: this.service.id,
        serviceType: [this.service.serviceType, [Validators.required]],
        duration: [this.service.duration, [Validators.required]],
        price: [this.service.price, [Validators.required]],
        description: this.service.description
      }
    );

    this.dialogRef.beforeClosed().subscribe(data => {
      data.id = this.myForm.value.id;
      data.serviceType = this.myForm.value.serviceType;
      data.duration = this.myForm.value.duration;
      data.price = this.myForm.value.price;
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

  incrementDuration() {

    let currentDuration = this.myForm.value.duration;

    if (currentDuration === 60) {
      return;
    }

    currentDuration += this.minServiceDuration;

    this.myForm.patchValue({
      duration: currentDuration
    });
  }

  decrementDuration() {

    let currentDuration = this.myForm.value.duration;

    if (currentDuration === 0) {
      return;
    }

    currentDuration -= this.minServiceDuration;

    this.myForm.patchValue({
      duration: currentDuration
    });
  }

  incrementPrice() {

    let currentPrice = this.myForm.value.price;

    currentPrice++;

    this.myForm.patchValue({
      price: currentPrice
    });
  }

  decrementPrice() {

    let currentPrice = this.myForm.value.price;

    if (currentPrice === 0) {
      return;
    }

    currentPrice--;

    this.myForm.patchValue({
      price: currentPrice
    });
  }
}
