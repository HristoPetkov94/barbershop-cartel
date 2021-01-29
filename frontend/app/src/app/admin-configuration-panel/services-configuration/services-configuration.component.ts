import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ServiceDialogComponent} from './dialogs/service-dialog/service-dialog.component';
import {BarberService} from '../../services/barber.service';
import {Service} from '../../interfaces/service';
import {Barber} from '../../models/barber.model';
import {NotificationComponent} from '../../notification/notification.component';

@Component({
  selector: 'app-services-configuration',
  templateUrl: './services-configuration.component.html',
  styleUrls: ['./services-configuration.component.css', '../shared-styles/shared.css']
})
export class ServicesConfigurationComponent implements OnInit {

  @ViewChildren('price') prices!: QueryList<ElementRef>;
  @ViewChildren('duration') durations!: QueryList<ElementRef>;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  barbers: Barber[];
  services: Service[];

  selectedBarber: Barber;

  public currency = 'лв.';

  constructor(private dialog: MatDialog, private barberService: BarberService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData() {
    this.barberService.getBarbers().subscribe(barbers => {
      this.barbers = barbers;
      this.selectedBarber = this.barbers[0];
      this.services = this.selectedBarber.services;
      this.services.sort((a, b) => a.serviceType.localeCompare(b.serviceType));
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
    });
  }

  loadServices(val) {
    const barber = this.barbers.find(b => b.id + '' === val);

    this.selectedBarber = barber;

    this.services = barber.services;
  }


  increment(inputType: string, id: number) {
    const identifier = inputType + id;

    let element;

    if (inputType === 'duration') {
      element = this.durations.find((elem) => identifier === elem.nativeElement.id);
    } else {
      element = this.prices.find((elem) => identifier === elem.nativeElement.id);
    }

    element.nativeElement.stepUp();
  }

  decrement(inputType: string, id: number) {
    const identifier = inputType + id;

    let element;

    if (inputType === 'duration') {
      element = this.durations.find((elem) => identifier === elem.nativeElement.id);
    } else {
      element = this.prices.find((elem) => identifier === elem.nativeElement.id);
    }

    element.nativeElement.stepDown();
  }

  save(service: Service): void {

    if (service.id === undefined) {
      this.barberService.createService(this.selectedBarber.id, service).subscribe(data => {
          this.fetchData();
        }, () => {
          this.notification.showMessage('update unsuccessful', 'warn');
        },
        () => {
          this.notification.showMessage('update successful', 'success');
        }
      );
    } else {
      this.barberService.updateService(this.selectedBarber.id, service).subscribe(data => {
          this.fetchData();
        }, () => {
          this.notification.showMessage('update unsuccessful', 'warn');
        },
        () => {
          this.notification.showMessage('update successful', 'success');
        }
      );
    }
  }

  delete(service: Service) {

    if (service.id === undefined) {
      confirm('Are you sure you want to delete the empty service form?');
      this.spliceFromServicesList(service);
      return;
    }

    if (confirm('Are you sure you want to delete ' + service.serviceType + '?')) {
      this.barberService.deleteService(this.selectedBarber.id, service.id).subscribe(
        data => {
          this.fetchData();
        }, () => {
          this.notification.showMessage('update unsuccessful', 'warn');
        },
        () => {
          this.notification.showMessage('update successful', 'success');
        }
      );
    }
  }

  spliceFromServicesList(service: Service) {
    const index = this.services.indexOf(service, 0);

    if (index > -1) {
      this.services.splice(index, 1);
    }
  }
}

