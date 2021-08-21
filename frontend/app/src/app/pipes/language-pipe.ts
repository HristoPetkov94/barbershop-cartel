import {Pipe, PipeTransform} from '@angular/core';
import {getCookie} from '../utils/cookie.utils';

@Pipe({
  name: 'language',
  pure: false
})
export class LanguagePipe implements PipeTransform {

  transform(internationalString) {

    return internationalString[this.language];
  }

  get language(): string {
    return getCookie('lang');
  }
}
