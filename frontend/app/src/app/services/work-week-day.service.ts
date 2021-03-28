import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subscribable} from 'rxjs';
import {WorkWeekDayModel} from '../models/work-week-day.model';

@Injectable({
  providedIn: 'root'
})
export class WorkWeekDayService {

  private servicesUrl = environment.apiUrl + '/work-week-days';

  constructor(private http: HttpClient) {
  }

  getAllByBarberId(id: number): Subscribable<WorkWeekDayModel[]> {
    return this.http.get<WorkWeekDayModel[]>(this.servicesUrl + '/barber/' + id );
  }

  updateWorkingHoursModels(models: WorkWeekDayModel[]): Subscribable<WorkWeekDayModel[]> {
    return this.http.put(this.servicesUrl + '/bulk-update', models);
  }
}
