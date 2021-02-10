import {Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {Barber} from '../../../models/barber.model';
import {BarberService} from '../../../services/barber.service';
import {NotificationComponent} from '../../../notification/notification.component';
import {BarberEditComponent} from '../barber-edit/barber-edit.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-barber-view',
  templateUrl: './barber-view.component.html',
  styleUrls: ['./barber-view.component.css', '../../shared-styles/shared.css']
})
export class BarberViewComponent implements OnInit {
  deleted = false;

  @Input() barber: Barber;

  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild('chooseFile') public chooseFile: ElementRef;

  ngOnInit(): void {
  }

  constructor(private barberService: BarberService, private dialog: MatDialog) {
  }

  delete() {
    if (confirm('Are you sure you want to delete ' + this.barber.firstName + '' + this.barber.lastName + '?')) {

      this.barberService.deleteBarber(this.barber.id).subscribe(data => {
          this.deleted = true;
        },
        () => {
          this.notification.showMessage('update unsuccessful', 'warn');
        },
        () => {
          this.notification.showMessage('update successful', 'success');
        }
      );
    }
  }

  save() {
      this.barberService.updateBarber(this.barber).subscribe(data => {
        },
        () => {
          this.notification.showMessage('update unsuccessful', 'warn');
        },
        () => {
          this.notification.showMessage('update successful', 'success');
        }
      );
  }

  edit(): void {
    const dialogRef = this.dialog.open(BarberEditComponent, {
      width: '450px',
      data: this.barber
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.barber.picture = result.picture;
      this.save();
    });
  }
}
