import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Service} from '../../models/service';
import {NotificationComponent} from '../../notification/notification.component';
import {ImageService} from '../../services/image.service';
import {ServiceEditDialogComponent} from './service-edit-dialog/service-edit-dialog.component';
import {ServiceService} from '../../services/service.service';

@Component({
  selector: 'app-services-configuration',
  templateUrl: './service-configuration.component.html',
  styleUrls: ['./service-configuration.component.css', '../shared-styles/shared.css']
})
export class ServiceConfigurationComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  public loading = true;
  public services: Service[];

  constructor(private dialog: MatDialog, private servicesService: ServiceService, private  imageService: ImageService) {
  }

  ngOnInit(): void {
    this.servicesService.getServices().subscribe(data => {
      this.services = data;
    }, () => {
    }, () => {
      this.loading = false;
    });
  }

  add() {
    const service = new Service();
    service.picture = this.imageService.getDefaultServiceImage();
    const dialogRef = this.dialog.open(ServiceEditDialogComponent, {
      width: '40%',
      data: service
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  save(service: Service): void {

    this.servicesService.createService(service).subscribe((data: Service) => {
        this.services.unshift(data);
      }, () => {
        this.notification.showMessage('Service has not been added successfully.', 'warn');
      },
      () => {
        this.notification.showMessage('Service has been added successfully.', 'success');
      }
    );
  }
}

