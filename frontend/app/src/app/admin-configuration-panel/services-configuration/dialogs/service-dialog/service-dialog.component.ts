import {Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
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

  @ViewChild('something', {static: false}) something: ElementRef;
  @ViewChildren('element') viewChildren !: QueryList<ElementRef>;

  public servicesToBeUploaded: ServicePictureUpdateRequest[] = new Array<ServicePictureUpdateRequest>();

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.reader = new FileReader();

    // this.servicesToBeUploaded = this.data.services.map(s => ({s}));
  }

  ngOnInit(): void {
  }

  addService() {

    const last = this.data.services.length;

    const newService = new Service();
    newService.serviceType = '';
    newService.priceBGN = 0;
    newService.duration = 0;

    if (last > 0) {
      const service = this.data.services[last - 1];
      newService.id = service.id + 1;

    } else {
      newService.id = 1; // this is 1 one because it represent the first id in a db.
    }

    this.data.services.push(newService);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileChangedService(event, service) {
    console.log(event);
    const id = event.target.id;

    console.log(id);
    const file = event && event.target.files[0];
    // this.onchange(file);
    const reader = new FileReader();
    reader.readAsDataURL(file); // toBase64
    reader.onload = () => {
      service.picture = reader.result as string;
    };
  }

  // @HostListener('change', ['$event'])
  // emitFiles( event ) {
  //
  //
  // }

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
