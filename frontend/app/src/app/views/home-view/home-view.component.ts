import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {GeneralConfigurationService} from '../../services/general.configuration.service';
import {SocialMediaModel} from '../../models/general.configuration/social.media.model';


@Component({
  selector: 'app-home',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
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

export class HomeViewComponent implements OnInit {

  public frontPageMessage: string;
  public socialMedia = new SocialMediaModel();

  constructor(private generalConfigurationService: GeneralConfigurationService) {
  }

  ngOnInit() {
    this.generalConfigurationService.getFrontPageMessage().subscribe(data => {
      this.frontPageMessage = data;
    });

    this.generalConfigurationService.getSocialMedia().subscribe(data => {
      this.socialMedia = data;
    });
  }
}
