import {Pipe, PipeTransform} from '@angular/core';
import {getCookie} from '../utils/cookie.utils';

@Pipe({
  name: 'translate2',
  pure: false
})
export class Translate2Pipe implements PipeTransform {

  transform(internationalString): number {

    let language = getCookie('lang');

    return internationalString[language]
  }
}
