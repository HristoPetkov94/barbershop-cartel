import {Component, OnInit} from '@angular/core';
import {Service} from '../interfaces/service';
import {ServicesService} from '../services/services.service';

@Component({
  selector: 'app-barber-services-panel',
  templateUrl: './barber-services-panel.component.html',
  styleUrls: ['./barber-services-panel.component.css']
})
export class BarberServicesPanelComponent implements OnInit {

  public services: Service[];

  constructor(private servicesService: ServicesService) {
  }

  ngOnInit() {
    this.servicesService.getAllServices().subscribe(s => {
      this.services = s;
    });
  }
}
