import {Component, OnInit} from '@angular/core';
import {GeneralConfigurationService} from '../../services/general.configuration.service';
import {Configuration} from '../../models/general.configuration/configuration.model';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit {

  public email: string;
  public configuration: Configuration = new Configuration();

  constructor(private generalConfigurationService: GeneralConfigurationService) {
  }

  ngOnInit(): void {
    this.generalConfigurationService.getUsers().subscribe(user => {
      const adminUser = user[0];
      this.email = adminUser.email;
    });

    this.generalConfigurationService.getConfiguration().subscribe(configuration => {
      this.configuration = configuration;
    });
  }
}
