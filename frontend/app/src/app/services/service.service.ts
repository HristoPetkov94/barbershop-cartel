import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subscribable} from 'rxjs';
import {Service} from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private servicesUrl = environment.apiUrl + '/services';

  constructor(private http: HttpClient) {
  }

  getServices(): Subscribable<Service[]> {
    return this.http.get<Service[]>(this.servicesUrl);
  }

  createService(service: Service) {
    return this.http.post(this.servicesUrl, service);
  }

  updateService(service: Service) {
    return this.http.put(this.servicesUrl, service);
  }

  deleteService(serviceId: number) {
    return this.http.delete(this.servicesUrl + '?' + 'serviceId=' + serviceId);
  }
}
