import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../services/services.service';
import {BarberService} from '../services/barber.service';
import {Service} from '../interfaces/service';
import {Barber} from '../models/barber.model';

@Component({
  selector: 'app-configuration-panel',
  templateUrl: './data-configuration-panel.component.html',
  styleUrls: ['./data-configuration-panel.component.css']
})
export class DataConfigurationPanelComponent implements OnInit {
  public barbers: Barber[];
  public services: Service[];

  constructor(private servicesService: ServicesService, private barberService: BarberService) {}

  ngOnInit() {
    this.barberService.getBarbers().subscribe(b => this.barbers = b);
    // this.services = this.servicesService.getAll();
  }

}
