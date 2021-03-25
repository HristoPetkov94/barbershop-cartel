import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subscribable} from 'rxjs';
import {Service} from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getServices(): Subscribable<Service[]> {
    return this.http.get<Service[]>(this.url + '/services');
  }

  createService(service: Service) {
    return this.http.post(this.url + '/services', service);
  }

  updateService(service: Service) {
    return this.http.put(this.url + '/services', service);
  }

  deleteService(serviceId: number) {
    return this.http.delete(this.url + '/services' + '?' + 'serviceId=' + serviceId);
  }
}
