import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatDialog} from '@angular/material';
import {BarberService} from '../../services/barber.service';
import {Service} from '../../interfaces/service';
import {Barber} from '../../models/barber.model';
import {NotificationComponent} from '../../notification/notification.component';
import {ImageService} from '../../services/image.service';
import {ServiceEditDialogComponent} from './service-edit-dialog/service-edit-dialog.component';

@Component({
  selector: 'app-services-configuration',
  templateUrl: './service-configuration.component.html',
  styleUrls: ['./service-configuration.component.css', '../shared-styles/shared.css']
})
export class ServiceConfigurationComponent implements OnInit {

  @ViewChildren('price') prices!: QueryList<ElementRef>;
  @ViewChildren('duration') durations!: QueryList<ElementRef>;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  public loading = true;
  public barbers: Barber[];
  public services: Service[];
  public selectedBarber: Barber;

  constructor(private dialog: MatDialog, private barberService: BarberService, private  imageService: ImageService) {
  }

  ngOnInit(): void {
    this.barberService.getBarbers().subscribe(barbers => {

      this.barbers = barbers;
      this.selectedBarber = this.barbers[0];
      this.services = this.selectedBarber.services;

    }, () => {
    }, () => {
      this.loading = false;
    });
  }

  add() {
    const service = new Service();
    service.picture = this.imageService.getDefaultServiceImage();
    const dialogRef = this.dialog.open(ServiceEditDialogComponent, {
      width: 'auto',
      data: service
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  save(service: Service): void {

    this.barberService.createService(this.selectedBarber.id, service).subscribe((data: Service) => {
        this.services.unshift(data);
      }, () => {
        this.notification.showMessage('update unsuccessful', 'warn');
      },
      () => {
        this.notification.showMessage('update successful', 'success');
      }
    );
  }

  loadServices(val) {
    const barber = this.barbers.find(b => b.id + '' === val);

    this.selectedBarber = barber;

    this.services = barber.services;
  }
}

