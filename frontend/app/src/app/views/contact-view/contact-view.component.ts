import {Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {GeneralConfigurationService} from '../../services/general.configuration.service';
import {Configuration} from '../../models/general.configuration/configuration.model';
import {LanguagePipe} from '../../pipes/language-pipe';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactViewComponent implements OnInit, OnChanges {

  public email: string;
  public configuration: Configuration;
  public workTimeInfo;

  constructor(private generalConfigurationService: GeneralConfigurationService, private languagePipe: LanguagePipe) {
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log('roroorr');
  }

  ngOnInit(): void {

    this.generalConfigurationService.getUsers().subscribe(user => {
      const adminUser = user[0];
      this.email = adminUser.email;
    });

    this.generalConfigurationService.getConfiguration().subscribe(configuration => {
      this.configuration = configuration;

      const data = configuration.workingTimeInfo[this.languagePipe.language];

      const regex = /#(.*)#/g;
      const result = data.match(regex);

      this.workTimeInfo = data;

      // set default style
      this.workTimeInfo = `<span class="info-sub-text">${this.workTimeInfo}</span>`;

      // set style on # words
      for (const res of result) {
        const word = res.replace(/#/g, '');

        this.workTimeInfo = this.workTimeInfo.replace(res, '<span class="info-sub-text-brown">' + word + '</span>');
      }
    });
  }
}
