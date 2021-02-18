import {Component, OnInit} from '@angular/core';
import {getCookie, setCookie} from '../utils/cookie.utils';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-compact-navbar',
  templateUrl: './compact-navbar.component.html',
  styleUrls: ['./compact-navbar.component.css']
})
export class CompactNavbarComponent implements OnInit {
  public hideBurger = false;

  constructor(public translate: TranslateService) {
  }

  ngOnInit() {
    const cookie = getCookie('lang');
    const preferredLang = cookie === undefined ? 'bg' : cookie;

    this.translate.use(preferredLang);
  }

  changeLang() {
    const currentLang = this.translate.currentLang;
    const lang = currentLang === 'en' ? 'bg' : 'en';

    setCookie('lang', lang);

    this.translate.use(lang);
  }
}
