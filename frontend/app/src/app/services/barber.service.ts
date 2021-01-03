import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subscribable} from 'rxjs';
import {Barber} from '../models/barber';

@Injectable({
  providedIn: 'root'
})
export class BarberService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAll(): Subscribable<Barber[]> {
    return this.http.get<Barber[]>(this.url + '/barbers');
  }

  update(barber: Barber) {
    return this.http.post<Barber>(this.url + '/barbers', barber);
  }

  updateAll(barbers: Barber[]) {
    return this.http.patch(this.url + '/barbers', barbers);
  }
}
