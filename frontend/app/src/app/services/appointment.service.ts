import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subscribable} from 'rxjs';
import {Week} from '../models/week.model';
import {AppointmentRequest} from '../interfaces/appointment-request';
import {AppointmentModel} from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private url = environment.apiUrl + '/appointments';

  constructor(private http: HttpClient) {
  }

  getWeek(numberOfWeeksFromNow, assignmentId) {
    return this.http.get<Week>(this.url + '/appointment-week' + '?' + 'assignmentId=' + assignmentId + '&' + 'numberOfWeeksFromNow=' + numberOfWeeksFromNow, {});
  }

  bookNow(req: AppointmentRequest, language: string) {
    return this.http.post(this.url + '/save-appointment' + '?' + 'language=' + language, req);
  }

  getFor(barberIds: number[], start: Date, end: Date) {

    let params = new HttpParams()
      .set("barberIds", barberIds.join(","))
      .set("from", start.toISOString())
      .set("to", end.toISOString());

    return this.http.get<AppointmentModel[]>(this.url, { params });
  }
}
