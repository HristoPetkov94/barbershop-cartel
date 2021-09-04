import {Injectable} from '@angular/core';
import {Subscribable} from 'rxjs';
import {ClientModel} from '../models/client.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private url = environment.apiUrl + '/clients';

  constructor(private http: HttpClient) {
  }

  getClients(): Subscribable<ClientModel[]> {

    return this.http.get<ClientModel[]>(this.url);
  }

  ban(id: number, banned: boolean)  {

    return this.http.post(this.url + `/ban/${id}/${banned}`, "");
  }
}
