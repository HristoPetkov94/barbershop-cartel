import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subscribable} from 'rxjs';
import {Service} from '../interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAll(): Subscribable<Service[]> {
    return this.http.get<Service[]>(this.url + '/services');
  }

  // Cool article to show how the broswer handles different image resolutions
  // https://medium.com/front-end-weekly/loading-images-on-the-web-fad536493bac
  updateAll(services: Service[]) {
    console.log(services);
    return this.http.patch(this.url + '/services', services);
  }
}
