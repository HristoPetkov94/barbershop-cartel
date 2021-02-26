import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {getCookie, setCookie} from '../../../utils/cookie.utils';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public isAdmin = false;

  constructor(public translate: TranslateService, private auth: AuthenticationService, private route: Router) {
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

  reloadComponent() {
    const currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }
  logout() {
    this.auth.logOut();

    this.reloadComponent();
  }
}
