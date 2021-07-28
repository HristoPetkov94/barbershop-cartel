import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Barber} from '../../../models/barber.model';
import {BarberService} from '../../../services/barber.service';
import {NotificationComponent} from '../../../notification/notification.component';
import {BarberEditDialogComponent} from '../barber-edit-dialog/barber-edit-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {getCookie} from '../../../utils/cookie.utils';

@Component({
  selector: 'app-barber-view',
  templateUrl: './barber-view.component.html',
  styleUrls: ['./barber-view.component.css', '../../shared-styles/shared.css']
})
export class BarberViewComponent implements OnInit {
  deleted = false;
  public language: string;

  @Input() barber: Barber;

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  ngOnInit(): void {
    this.language = getCookie('lang');
  }

  constructor(private barberService: BarberService, private dialog: MatDialog) {
  }

  delete() {
    if (confirm('Are you sure you want to delete ' + this.barber.firstName[this.language] + ' ' + this.barber.lastName[this.language] + '?')) {

      this.barberService.deleteBarber(this.barber.id).subscribe(data => {
        },
        () => {
          this.notification.showMessage('Barber has not been deleted successfully.', 'warn');
        },
        () => {
          this.deleted = true;
          this.notification.showMessage('Barber has been deleted successfully.', 'success');
        }
      );
    }
  }

  update(barber: Barber) {
    this.barberService.updateBarber(barber).subscribe(data => {
      },
      () => {
        this.notification.showMessage('Barber has not been updated successfully.', 'warn');
      },
      () => {
        this.barber = barber;
        this.notification.showMessage('Barber has been updated successfully.', 'success');
      }
    );
  }

  edit(): void {
    const dialogRef = this.dialog.open(BarberEditDialogComponent, {
      width: '560px',
      data: Object.assign({}, this.barber)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update(result);
      }
    });
  }
}
