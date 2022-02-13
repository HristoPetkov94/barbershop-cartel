import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DashboardRequestModel} from '../models/dashboard/dashboard.request.model';
import {DashboardResponseModel} from '../models/dashboard/dashboard.response.model';
import {Subscribable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private barbersUrl = environment.apiUrl + '/dashboard';

  constructor(private http: HttpClient) {
  }

  generateReport(dashboardModel: DashboardRequestModel): Subscribable<DashboardResponseModel>{
    return this.http.post<DashboardResponseModel>(this.barbersUrl, dashboardModel);
  }

}
