import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {setCookie} from '../../../utils/cookie.utils';
import {RoutingExtService} from '../../../services/routing-ext.service';
import {Router} from '@angular/router';
import {LanguagePipe} from '../../../pipes/language-pipe';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public isAdmin = false;

  constructor(public translate: TranslateService,
              private auth: AuthenticationService,
              private routeExt: RoutingExtService,
              private router: Router,
              private languagePipe: LanguagePipe) {
  }

  ngOnInit(): void {
    this.isAdmin = this.auth.isUserLoggedIn();

    const language = this.languagePipe.language;
    const preferredLang = language === undefined ? 'bg' : language;

    this.translate.use(preferredLang);
  }

  changeLang() {
    const currentLang = this.translate.currentLang;
    const lang = currentLang === 'en' ? 'bg' : 'en';

    setCookie('lang', lang);

    this.translate.use(lang);

    const isHomepage = this.router.url === '/';

    if (isHomepage) {
      this.routeExt.reloadComponent();
    }
  }

  logout() {
    this.auth.logOut();

    this.routeExt.reloadComponent();
  }
}
