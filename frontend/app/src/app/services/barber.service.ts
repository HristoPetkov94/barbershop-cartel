import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subscribable} from 'rxjs';
import {Barber} from '../models/barber.model';
import {Service} from '../interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class BarberService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getBarbers(): Subscribable<Barber[]> {
    return this.http.get<Barber[]>(this.url + '/barbers');
  }

  createBarber(barber: Barber) {
    return this.http.post<Barber>(this.url + '/barbers', barber);
  }

  updateBarber(barber: Barber) {
    return this.http.put(this.url + '/barbers', barber);
  }

  deleteBarber(barberId: number) {
    return this.http.delete(this.url + '/barbers' + '?' + 'barberId=' + barberId);
  }

  createService(barberId: number, service: Service) {
    return this.http.post(this.url + '/barbers/create-service' + '?' + 'barberId=' + barberId, service);
  }

  updateService(barberId: number, service: Service) {
    return this.http.put(this.url + '/barbers/update-service' + '?' + 'barberId=' + barberId, service);
  }

  deleteService(barberId: number, serviceId: number) {
    return this.http.delete(this.url + '/barbers/delete-service' + '?' + 'barberId=' + barberId + '&' + 'serviceId=' + serviceId);
  }
}
