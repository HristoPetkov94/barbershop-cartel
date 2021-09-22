import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AppointmentRequest} from '../interfaces/appointment-request';
import {AppointmentModel} from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private url = environment.apiUrl + '/appointments';

  constructor(private http: HttpClient) {
  }

  create(req: AppointmentRequest, allowOverlap: boolean = false) {
    return this.http.post(this.url + '?allowOverlap=' + allowOverlap, req);
  }

  update(req: AppointmentRequest) {
    return this.http.put(this.url, req);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  getFor(barberIds: number[], start: Date, end: Date) {

    const params = new HttpParams()
      .set('barberIds', barberIds.join(','))
      .set('from', start.toISOString())
      .set('to', end.toISOString());

    return this.http.get<AppointmentModel[]>(this.url, { params });
  }
}
