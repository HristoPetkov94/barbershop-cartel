import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ServiceDialogComponent} from './dialogs/service-dialog/service-dialog.component';
import {BarberService} from '../../services/barber.service';
import {Service} from '../../interfaces/service';
import {ServicesService} from '../../services/services.service';
import {Barber} from '../../models/barber';
import {NotificationComponent} from '../../notification/notification.component';

@Component({
  selector: 'app-services-configuration',
  templateUrl: './services-configuration.component.html',
  styleUrls: ['./services-configuration.component.css', '../shared-styles/shared.css']
})
export class ServicesConfigurationComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  barbers: Barber[];
  services: Service[];

  selectedBarber: Barber;

  constructor(private dialog: MatDialog, private barberService: BarberService, private servicesService: ServicesService) {
  }

  ngOnInit(): void {
    this.barberService.getAll().subscribe(barbers => {
      this.barbers = barbers;
      this.selectedBarber = this.barbers[0];
      this.services = this.selectedBarber.services;

      this.services.sort((a, b) => a.id - b.id);
    });
  }

  add() {
    this.services.push(new Service());
  }

  openServiceDialog(services): void {

    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: '45%',
      height: '80%',
      data: {
        services
      },
      panelClass: 'light-theme'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('services to be updated: ', result);
      // this.servicesToBeUpdated = result;
    });
  }

  loadServices(val) {
    const barber = this.barbers.find(b => b.id + '' === val);

    this.selectedBarber = barber;

    this.services = barber.services;
  }

  save() {
    const barber = this.selectedBarber;

    this.servicesService.updateAll(barber.services).subscribe(
      data => {

      }, () => {
        this.notification.showMessage('update unsuccessful', 'warn');
      },
      () => {
        this.notification.showMessage('update successful', 'success');
      }
    );
  }

}

