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

  getBarbers(): Observable<Barber[]> {
    return this.http.get<Barber[]>(this.url + '/barbers');
  }

  getBarberByUsername(email: string): Subscribable<Barber> {
    return this.http.get<Barber>(this.url + '/barbers/barber-by-email?email=' + email);
  }

  updateBarberPicture(barberId, image) {
    console.log('barber: ' + barberId + ' image:', image);
    return this.http.post<Barber>(this.url + '/barbers/' + barberId + '/picture/', image);
  }

  updateBarber(barber: Barber) {
    return this.http.post<Barber>(this.url + '/barbers', barber);
  }

  updateBarberPassword(barberId, newPassword: string) {
    return this.http.post(this.url + '/barbers/' + barberId, newPassword);
  }
}
