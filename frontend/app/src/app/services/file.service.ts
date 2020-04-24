import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  upload(file: File) {
    return this.http.post('/upload', file);
  }
}
