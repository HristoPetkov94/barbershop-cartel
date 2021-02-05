import {Component, OnInit} from '@angular/core';
import {Service} from '../../interfaces/service';
import {ServicesService} from '../../services/services.service';
import {fade} from '../animations/fade';

@Component({
  selector: 'app-barber-services-panel',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.css'], animations: [
    fade
  ]
})
export class ServiceViewComponent implements OnInit {

  public services: Service[];

  constructor(private servicesService: ServicesService) {
  }

  ngOnInit() {
    this.servicesService.getServices().subscribe(s => {
      this.services = s;
    });
  }
}
