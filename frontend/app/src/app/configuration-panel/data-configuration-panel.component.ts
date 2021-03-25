import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../services/service.service';
import {BarberService} from '../services/barber.service';
import {Service} from '../models/service';
import {Barber} from '../models/barber.model';

@Component({
  selector: 'app-configuration-panel',
  templateUrl: './data-configuration-panel.component.html',
  styleUrls: ['./data-configuration-panel.component.css']
})
export class DataConfigurationPanelComponent implements OnInit {
  public barbers: Barber[];
  public services: Service[];

  constructor(private servicesService: ServiceService, private barberService: BarberService) {}

  ngOnInit() {
    this.barberService.getBarbers().subscribe(b => this.barbers = b);
    // this.services = this.servicesService.getAll();
  }

}
