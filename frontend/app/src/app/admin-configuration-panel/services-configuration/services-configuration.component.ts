import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ServiceDialogComponent} from './dialogs/service-dialog/service-dialog.component';

@Component({
  selector: 'app-services-configuration',
  templateUrl: './services-configuration.component.html',
  styleUrls: ['./services-configuration.component.css', '../shared-styles/shared.css']
})
export class ServicesConfigurationComponent implements OnInit {
  services = [1, 2, 3];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  add() {
    this.services.push(1);
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


}

