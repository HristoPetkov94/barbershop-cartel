import {Component, OnInit} from '@angular/core';
import {ClientsService} from '../../services/clients.service';

@Component({
  selector: 'app-clients-configuration',
  templateUrl: './clients-configuration.component.html',
  styleUrls: ['./clients-configuration.component.css']
})
export class ClientsConfigurationComponent implements OnInit {
  displayedColumns: string[] = ['phone', 'name', 'email'];

  clients$;

  constructor(
     private clientsService: ClientsService,
  ) { }

  ngOnInit(): void {
    this.clients$ = this.clientsService.getClients();
  }

}
