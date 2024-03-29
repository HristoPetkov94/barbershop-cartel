import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Barber} from '../../../models/barber.model';
import {BarberService} from '../../../services/barber.service';
import {NotificationComponent} from '../../../notification/notification.component';
import {BarberEditDialogComponent} from '../barber-edit-dialog/barber-edit-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {LanguagePipe} from '../../../pipes/language-pipe';

@Component({
  selector: 'app-barber-view',
  templateUrl: './barber-view.component.html',
  styleUrls: ['./barber-view.component.css', '../../shared-styles/shared.css']
})
export class BarberViewComponent implements OnInit {
  deleted = false;

  @Input() barber: Barber;

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  ngOnInit(): void {
  }

  constructor(private barberService: BarberService,
              private dialog: MatDialog,
              private languagePipe: LanguagePipe) {
  }

  delete() {

    const firstName = this.languagePipe.transform(this.barber.firstName);
    const lastName = this.languagePipe.transform(this.barber.lastName);

    if (confirm('Are you sure you want to delete ' + firstName + ' ' + lastName + '?')) {

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
      data: Object.assign({}, this.barber),
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update(result);
      }
    });
  }
}
