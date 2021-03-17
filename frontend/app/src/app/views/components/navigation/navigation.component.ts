import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {getCookie, setCookie} from '../../../utils/cookie.utils';
import {RoutingExtService} from '../../../services/routing-ext.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public isAdmin = false;

  constructor(public translate: TranslateService,
              private auth: AuthenticationService,
              private routeExt: RoutingExtService) {
  }

  ngOnInit(): void {
    this.isAdmin = this.auth.isUserLoggedIn();

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

  logout() {
    this.auth.logOut();

    this.routeExt.reloadComponent();
  }
}
