import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Router, RouterOutlet} from '@angular/router';
import {getCookie, setCookie} from '../../utils/cookie.utils';
import {TranslateService} from '@ngx-translate/core';
import {fade} from '../../views/animations/fade';
import {transitionFade} from '../../views/animations/transition.fade';
import {LanguageEnum} from '../../enums/language.enum';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css', '../shared-styles/shared.css'], animations: [transitionFade, fade]
})
export class AdminLayoutComponent implements OnInit {
  public language;
  public bulgarian = LanguageEnum.BG;
  public english = LanguageEnum.EN;

  constructor(
    private authenticationService: AuthenticationService,
    public translate: TranslateService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.language = getCookie('lang');
    this.translate.use(this.language);
  }

  logout() {
    this.authenticationService.logOut();

    this.router.navigate(['/login']);
  }

  changeLang(event) {

    setCookie('lang', event.value);

    this.translate.use(event.value);
    this.language = event.value;

    // reloads the current url, which triggers rerender for current component.
    const url = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([url]);
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
