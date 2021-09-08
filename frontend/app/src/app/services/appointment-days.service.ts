import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Day} from '../interfaces/day';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDaysService {

  private url = environment.apiUrl + '/appointment-day-models';

  constructor(private http: HttpClient) {
  }

  get(assignmentId, from, to) {

    const params = new HttpParams()
      .set('assignmentId', assignmentId)
      .set('from', from.format('YYYY-MM-DDTHH:mm:ss') )
      .set('to', to.format('YYYY-MM-DDTHH:mm:ss') );

    return this.http.get<Day[]>(this.url, {params});
  }

}
