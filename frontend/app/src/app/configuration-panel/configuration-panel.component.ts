import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../services/services.service';
import {BarberService} from '../services/barber.service';
import {Service} from '../interfaces/service';
import {Barber} from '../models/barber';

@Component({
  selector: 'app-configuration-panel',
  templateUrl: './configuration-panel.component.html',
  styleUrls: ['./configuration-panel.component.css']
})
export class ConfigurationPanelComponent implements OnInit {
  private barbers: Barber[];
  private services: Service[];

  constructor(private servicesService: ServicesService, private barberService: BarberService) {}

  ngOnInit() {
    this.barberService.getBarbers().subscribe(b => this.barbers = b);
    // this.services = this.servicesService.getAllServices();
  }

}
