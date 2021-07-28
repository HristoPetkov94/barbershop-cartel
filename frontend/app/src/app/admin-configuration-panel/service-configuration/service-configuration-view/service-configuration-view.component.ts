import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Service} from '../../../models/service';
import {MatDialog} from '@angular/material/dialog';
import {ServiceEditDialogComponent} from '../service-edit-dialog/service-edit-dialog.component';
import {NotificationComponent} from '../../../notification/notification.component';
import {ServiceService} from '../../../services/service.service';
import {Barber} from '../../../models/barber.model';
import {getCookie} from '../../../utils/cookie.utils';

@Component({
  selector: 'app-service-configuration-view',
  templateUrl: './service-configuration-view.component.html',
  styleUrls: ['./service-configuration-view.component.css', '../../shared-styles/shared.css']
})
export class ServiceConfigurationViewComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  @Input() service: Service;

  public deleted = false;
  public language: string;
  public barber: Barber;

  constructor(private dialog: MatDialog,
              private serviceService: ServiceService) {
  }

  ngOnInit(): void {
    this.language = getCookie('lang');
  }

  delete() {
    if (confirm('Are you sure you want to delete ' + this.service.serviceTitle[this.language] + '?')) {

      this.serviceService.deleteService(this.service.id).subscribe(() => {
        }, () => {
          this.notification.showMessage('"Service has not been deleted successfully.', 'warn');
        },
        () => {
          this.deleted = true;
          this.notification.showMessage('Service has been deleted successfully.', 'success');
        }
      );
    }
  }

  update(service: Service) {

    this.serviceService.updateService(service).subscribe(() => {
      },
      () => {
        this.notification.showMessage('Service has not been updated successfully.', 'warn');
      },
      () => {
        this.service = service;
        this.notification.showMessage('Service has been updated successfully.', 'success');
      }
    );
  }

  edit(): void {
    const dialogRef = this.dialog.open(ServiceEditDialogComponent, {
      width: '40%',
      data: Object.assign({}, this.service)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update(result);
      }
    });
  }
}
