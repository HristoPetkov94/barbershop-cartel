import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {fade} from '../animations/fade';
import {GeneralConfigurationService} from '../../services/general.configuration.service';
import {SocialMediaModel} from '../../models/general.configuration/social.media.model';
import {Router} from '@angular/router';


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
  public query: string;
  public socialMedia = new SocialMediaModel();

  constructor(
    private router: Router,
    private generalConfigurationService: GeneralConfigurationService,
  ) {
  }

  ngOnInit() {
    this.generalConfigurationService.getFrontPageMessage().subscribe(data => {

      const regex = /#(.*)#/g;
      const result = data.match(regex);

      this.frontPageMessage = data;

      if (result) {
        for (const res of result) {
          const word = res.replace(/#/g, '');
          this.frontPageMessage = this.frontPageMessage.replace(res, '<span class="limited">' + word + '</span>');
        }
      }
    });

    this.generalConfigurationService.getSocialMedia().subscribe(data => {
      this.socialMedia = data;
    });
  }

  book() {
    this.router.navigate(['/book-now']);
  }
}
