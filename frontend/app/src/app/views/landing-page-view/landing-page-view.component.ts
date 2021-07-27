import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {fade} from '../animations/fade';
import {GeneralConfigurationService} from '../../services/general.configuration.service';
import {Router} from '@angular/router';
import {getCookie} from '../../utils/cookie.utils';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page-view.component.html',
  styleUrls: ['./landing-page-view.component.css'], animations: [
    fade
  ],
  encapsulation: ViewEncapsulation.None,
})

export class LandingPageViewComponent implements OnInit {

  public frontPageMessage: string;
  public facebook: string;
  public instagram: string;
  public query: string;

  constructor(
    private router: Router,
    private generalConfigurationService: GeneralConfigurationService,
  ) {
  }

  ngOnInit() {
    const language = getCookie('lang');

    this.generalConfigurationService.getConfiguration(language).subscribe(config => {

      const message = config.frontPageMessage;

      const regex = /#(.*)#/g;
      const result = message.match(regex);

      this.frontPageMessage = message;
      this.facebook = config.socialMediaFacebook;
      this.instagram = config.socialMediaInstagram;

      if (result) {
        for (const res of result) {
          const word = res.replace(/#/g, '');
          this.frontPageMessage = this.frontPageMessage.replace(res, '<span class="limited">' + word + '</span>');
        }
      }
    });
  }

  book() {
    this.router.navigate(['/book-now']);
  }
}
