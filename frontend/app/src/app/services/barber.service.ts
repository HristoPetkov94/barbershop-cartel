import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subscribable} from 'rxjs';
import {Barber} from '../models/barber.model';

@Injectable({
  providedIn: 'root'
})
export class BarberService {

  private barbersUrl = environment.apiUrl + '/barbers';

  constructor(private http: HttpClient) {
  }

  getBarbers(): Subscribable<Barber[]> {
    return this.http.get<Barber[]>(this.barbersUrl);
  }

  createBarber(barber: Barber) {
    return this.http.post<Barber>(this.barbersUrl, barber);
  }

  updateBarber(barber: Barber) {
    return this.http.put(this.barbersUrl, barber);
  }

  deleteBarber(barberId: number) {
    return this.http.delete(this.barbersUrl + '?' + 'barberId=' + barberId);
  }
}
