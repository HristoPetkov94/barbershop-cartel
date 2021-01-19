import {Component, OnInit} from '@angular/core';
import {Service} from '../../interfaces/service';
import {ServicesService} from '../../services/services.service';
// TODO: Refactor everything here methods, split into components if you have to, refactor css to make it more readable, delete unused stuff.
// TODO: Link with services.

@Component({
  selector: 'app-service-stack',
  templateUrl: './service-stack.component.html',
  styleUrls: ['./service-stack.component.css']
})
export class ServiceStackComponent implements OnInit {

  public services: Service[];

  constructor(private serviceServices: ServicesService) {
  }

  ngOnInit() {

    this.serviceServices.getServices().subscribe(s => this.services = s);
  }
}
