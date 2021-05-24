import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subscribable} from 'rxjs';
import {WorkDayModel} from '../models/work-day.model';

@Injectable({
  providedIn: 'root'
})
export class WorkDayService {

  private servicesUrl = environment.apiUrl + '/work-days';

  constructor(private http: HttpClient) {
  }

  getAllByBarberId(id: number): Subscribable<WorkDayModel[]> {
    return this.http.get<WorkDayModel[]>(this.servicesUrl + '/barber/' + id);
  }

  updateWorkingHoursModels(barberId: number, models: WorkDayModel[]): Subscribable<WorkDayModel[]> {
    return this.http.put<WorkDayModel[]>(this.servicesUrl + `/bulk-update/${barberId}`, models);
  }
}
