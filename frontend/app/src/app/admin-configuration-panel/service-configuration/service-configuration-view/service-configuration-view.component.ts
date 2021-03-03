import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Service} from '../../../interfaces/service';
import {Barber} from '../../../models/barber.model';
import {MatDialog} from '@angular/material/dialog';
import {ServiceEditDialogComponent} from '../service-edit-dialog/service-edit-dialog.component';
import {BarberService} from '../../../services/barber.service';
import {NotificationComponent} from '../../../notification/notification.component';

@Component({
  selector: 'app-service-configuration-view',
  templateUrl: './service-configuration-view.component.html',
  styleUrls: ['./service-configuration-view.component.css', '../../shared-styles/shared.css']
})
export class ServiceConfigurationViewComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  @Input() barber: Barber;
  @Input() service: Service;

  public deleted = false;
  public currency = 'лв.';
  public durationInMinutes = 'мин.';

  constructor(private dialog: MatDialog,
              private barberService: BarberService) {
  }

  ngOnInit(): void {
  }

  delete() {
    if (confirm('Are you sure you want to delete ' + this.service.serviceType + '?')) {

      this.barberService.deleteService(this.barber.id, this.service.id).subscribe(() => {
        }, () => {
          this.notification.showMessage('update unsuccessful', 'warn');
        },
        () => {
          this.deleted = true;
          this.notification.showMessage('update successful', 'success');
        }
      );
    }
  }

  update(service: Service) {

    this.barberService.updateService(this.barber.id, service).subscribe(() => {
      },
      () => {
        this.notification.showMessage('update unsuccessful', 'warn');
      },
      () => {
        const serviceIndex = this.barber.services.findIndex(item => item.id === service.id);
        this.barber.services[serviceIndex] = service;
        this.notification.showMessage('update successful', 'success');
      }
    );
  }

  edit(): void {
    const dialogRef = this.dialog.open(ServiceEditDialogComponent, {
      width: 'auto',
      data: Object.assign({}, this.service)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update(result);
      }
    });
  }
}
