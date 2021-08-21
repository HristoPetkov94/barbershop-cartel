import {Component, OnInit, ViewChild} from '@angular/core';
import {BarberService} from '../../services/barber.service';
import {Barber} from '../../models/barber.model';
import {MatDialog} from '@angular/material/dialog';
import {NotificationComponent} from '../../notification/notification.component';
import {BarberEditDialogComponent} from './barber-edit-dialog/barber-edit-dialog.component';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-barber-configuration',
  templateUrl: './barber-configuration.component.html',
  styleUrls: ['./barber-configuration.component.css', '../shared-styles/shared.css']
})
export class BarberConfigurationComponent implements OnInit {

  public barbers: Barber[];
  public loading = true;

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(
    private barberService: BarberService,
    private dialog: MatDialog,
    private imageService: ImageService
  ) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData() {
    this.barberService.getBarbers().subscribe(data => {
      this.barbers = data;
    }, () => {
    }, () => {
      this.loading = false;
    });
  }

  add() {
    const newBarber = new Barber();
    newBarber.firstName = {};
    newBarber.lastName = {};
    newBarber.description = {};

    newBarber.picture = this.imageService.getDefaultBarberImage();
    const dialogRef = this.dialog.open(BarberEditDialogComponent, {
      width: '560px',
      data: newBarber
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  save(barber: Barber) {

    this.barberService.createBarber(barber).subscribe((data: Barber) => {
        this.barbers.unshift(data);
      },
      () => {
        this.notification.showMessage('Barber has not been added successfully.', 'warn');
      },
      () => {

        this.notification.showMessage('Barber has been added successfully.', 'success');
      }
    );
  }
}
