import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subscribable} from 'rxjs';
import {SocialMediaModel} from '../models/general.configuration/social.media.model';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {
  private requestUrl = environment.apiUrl.concat('/social-media');

  constructor(private http: HttpClient) {
  }

  getSocialMedia(): Subscribable<SocialMediaModel> {
    return this.http.get<SocialMediaModel>(this.requestUrl);
  }

  saveSocialMedia(socialMedia: SocialMediaModel) {
    return this.http.post(this.requestUrl, socialMedia);
  }
}
