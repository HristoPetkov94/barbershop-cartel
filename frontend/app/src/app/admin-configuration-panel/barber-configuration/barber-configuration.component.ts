import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {BarberService} from '../../services/barber.service';
import {Barber} from '../../models/barber';
import {NotificationComponent} from '../../notification/notification.component';

@Component({
  selector: 'app-barber-configuration',
  templateUrl: './barber-configuration.component.html',
  styleUrls: ['./barber-configuration.component.css', '../shared-styles/shared.css']
})
export class BarberConfigurationComponent implements OnInit {

  public barbers: Barber[];
  public loading = true;

  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild('chooseFile') public chooseFile: ElementRef;
  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  constructor(private barberService: BarberService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData() {
    this.barberService.getBarbers().subscribe(data => {
      this.barbers = data;
    }, () => {
    }, () => {
      this.barbers.sort((a, b) => a.firstName.localeCompare(b.firstName));
      this.loading = false;
    });
  }

  changed(event, barber) {
    const file = event.target.files[0];
    this.getBase64(file, barber);
  }

  upload(barber: Barber) {
    const input = this.inputs.find((current) => barber.id + '' === current.nativeElement.id);
    input.nativeElement.click();
  }

  add() {
    this.barbers.push(new Barber());
  }

  delete(barber: Barber) {

    if (barber.id === undefined) {
      confirm('Are you sure you want to delete the empty barber form?');
      this.spliceFromBarbersList(barber);
      return;
    }

    if (confirm('Are you sure you want to delete ' + barber.firstName + '' + barber.lastName + '?')) {

      this.barberService.deleteBarber(barber.id).subscribe(data => {
          this.fetchData();
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

  spliceFromBarbersList(barber: Barber) {
    const index = this.barbers.indexOf(barber, 0);

    if (index > -1) {
      this.barbers.splice(index, 1);
    }
  }

  save(barber: Barber) {

    if (barber.id === undefined) {
      this.barberService.createBarber(barber).subscribe(data => {
          this.fetchData();
        },
        () => {
          this.notification.showMessage('update unsuccessful', 'warn');
        },
        () => {
          this.notification.showMessage('update successful', 'success');
        }
      );
    } else {
      this.barberService.updateBarber(barber).subscribe(data => {
          this.fetchData();
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

  getBase64(file, barber) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      barber.picture = reader.result;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
}
