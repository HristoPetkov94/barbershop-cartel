import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../../authentication/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public isAdmin = false;

  constructor(public translate: TranslateService, private auth: AuthenticationService) {
  }

  ngOnInit(): void {
    this.isAdmin = this.auth.isUserLoggedIn();
  }

  changeLang() {
    const currentLang = this.translate.currentLang;
    const lang = currentLang === 'en' ? 'bg' : 'en';
    this.translate.use(lang);
  }
}
