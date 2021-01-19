import {Component, ElementRef, Inject, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Service} from '../../../../interfaces/service';
import {ChangePasswordDialogComponent} from '../../../configuration.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ServicePictureUpdateRequest} from './service-picture-update-request';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css', '../../../shared-styles/shared.css']
})
export class ServiceDialogComponent implements OnInit {
  private reader;

  @ViewChildren('element') viewChildren !: QueryList<ElementRef>;

  public servicesToBeUploaded: ServicePictureUpdateRequest[] = new Array<ServicePictureUpdateRequest>();

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.reader = new FileReader();

  }

  ngOnInit(): void {
  }

  add() {
    this.data.services.push(new Service());
  }

  onFileChangedService(event, service) {
    const file = event && event.target.files[0];
    // this.onchange(file);
    const reader = new FileReader();
    reader.readAsDataURL(file); // toBase64
    reader.onload = () => {
      service.picture = reader.result as string;
    };
  }

  onUploadService(service) {
    this.viewChildren.forEach(element => {

      // + '' is like that because nativeElement.id is a string.
      if (element.nativeElement.id === service.id + '') {
        element.nativeElement.click();
        return;
      }
    });
  }
}
