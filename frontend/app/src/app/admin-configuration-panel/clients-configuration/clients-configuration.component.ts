import {Component, OnInit} from '@angular/core';
import {ClientsService} from '../../services/clients.service';

@Component({
  selector: 'app-clients-configuration',
  templateUrl: './clients-configuration.component.html',
  styleUrls: ['./clients-configuration.component.css']
})
export class ClientsConfigurationComponent implements OnInit {
  displayedColumns: string[] = ['phone', 'name', 'email', 'missedAppointmentsCount', 'allAppointmentsCount', 'banned'];

  clients$;

  constructor(
     private clientsService: ClientsService,
  ) { }

  ngOnInit(): void {

    this.clients$ = this.clientsService.getClients();
  }

  update(element) {

    console.log(element);

    this.clientsService.ban(element.id, element.banned).subscribe(data => {
      },
      () => {
        // this.notification.showMessage('Barber has not been updated successfully.', 'warn');
      },
      () => {
        // this.barber = barber;
        // this.notification.showMessage('Barber has been updated successfully.', 'success');
      }
    );
  }
}
