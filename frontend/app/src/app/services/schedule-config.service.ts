import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subscribable} from 'rxjs';
import {ScheduleConfig} from '../interfaces/schedule-config';

@Injectable({
  providedIn: 'root'
})
export class ScheduleConfigService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getBarberConfigs(barberId: number): Subscribable<ScheduleConfig[]> {
    return this.http.get<ScheduleConfig[]>(this.url + '/schedule-config/' + barberId);
  }

  saveConfiguration(conf: ScheduleConfig): Subscribable<ScheduleConfig[]> {
    return this.http.post(this.url + '/schedule-config', conf);
  }
}
