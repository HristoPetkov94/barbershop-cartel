import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subscribable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private apiUrl = environment.apiUrl;
  private storeUrl = '/store';

  constructor(private http: HttpClient) {
  }
}
