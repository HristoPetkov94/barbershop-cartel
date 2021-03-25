import {Component, OnInit} from '@angular/core';
import {Service} from '../../models/service';
import {ServiceService} from '../../services/service.service';

@Component({
  selector: 'app-barber-services-panel',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.css'],
})
export class ServiceViewComponent implements OnInit {

  public services: Service[];

  constructor(private servicesService: ServiceService) {
  }

  ngOnInit() {
    this.servicesService.getServices().subscribe(s => {
      this.services = s;
    });
  }
}
