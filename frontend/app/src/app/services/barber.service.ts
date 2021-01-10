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

  saveAll(barbers: Barber[]) {
    return this.http.post(this.url + '/barbers', barbers);
  }
}
