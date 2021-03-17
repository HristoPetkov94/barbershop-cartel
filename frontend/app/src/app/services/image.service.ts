import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private url = environment.apiUrl;

  constructor() {
  }

  public getDefaultBarberImage() {
    return this.url + '/images/default-profile-image.png';
  }

  public getDefaultServiceImage() {
    return this.url + '/images/default-service-image.png';
  }
}
