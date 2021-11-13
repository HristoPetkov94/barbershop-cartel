import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GeneralConfigurationService} from '../../services/general.configuration.service';
import {Configuration} from '../../models/general.configuration/configuration.model';
import {LanguageEnum} from '../../enums/language.enum';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactViewComponent implements OnInit {

  public email: string;
  public configuration: Configuration;
  public workTimeInfo = {};

  constructor(private generalConfigurationService: GeneralConfigurationService) {
  }

  ngOnInit(): void {

    this.generalConfigurationService.getUsers().subscribe(user => {
      const adminUser = user[0];
      this.email = adminUser.email;
    });

    this.generalConfigurationService.getConfiguration().subscribe(configuration => {
      this.configuration = configuration;

      const messageBG = configuration.workingTimeInfo[LanguageEnum.BG];
      const messageEN = configuration.workingTimeInfo[LanguageEnum.EN];

      // Change style for both of the languages and cash it into variable workTimeInfo.
      // This way we can change language without reload.
      this.changeStyle(messageBG, LanguageEnum.BG);
      this.changeStyle(messageEN, LanguageEnum.EN);
    });
  }

  private changeStyle(message, language) {

    const regex = /#(.*)#/g;
    const result = message.match(regex) ?? '';

    this.workTimeInfo[language] = message;

    // set default style
    this.workTimeInfo[language] = `<span class="info-sub-text">${this.workTimeInfo[language]}</span>`;

    // set style on # words
    for (const res of result) {
      const word = res.replace(/#/g, '');

      this.workTimeInfo[language] = this.workTimeInfo[language].replace(res, '<span class="info-sub-text-brown">' + word + '</span>');
    }
  }
}
