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

  getServices(): Subscribable<Service[]> {
    return this.http.get<Service[]>(this.url + '/services');
  }
}
