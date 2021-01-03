import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from "../authentication/authentication.service";


// TODO: Refactor everything here methods, split into components if you have to, refactor css to make it more readable, delete unused stuff.

// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:
    [
      trigger('slideInOut', [
        transition(':enter', [
          style({opacity: '0'}),
          animate('0.5s ease-in', style({opacity: '1'}))
        ]),
      ]),
    ],
})

export class HomeComponent implements OnInit {
  public tab = 'main';
  public isAdmin = false;

  constructor(public translate: TranslateService, private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.isAdmin = this.auth.isUserLoggedIn();
  }

  navigate($event: any) {
    this.tab = $event;
  }

  changeLang() {
    const currentLang = this.translate.currentLang;
    const lang = currentLang === 'en' ? 'bg' : 'en';
    this.translate.use(lang);
  }
}
