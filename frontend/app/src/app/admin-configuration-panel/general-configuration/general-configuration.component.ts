import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneralConfigurationService} from '../../services/general.configuration.service';
import {NotificationComponent} from '../../notification/notification.component';
import {Observable} from 'rxjs';
import {GitVersion} from '../../models/git-version.mode';
import {Configuration} from '../../models/general.configuration/configuration.model';
import {LanguagePipe} from '../../pipes/language-pipe';

@Component({
  selector: 'app-general-configuration',
  templateUrl: './general-configuration.component.html',
  styleUrls: ['./general-configuration.component.css', '../shared-styles/shared.css']
})
export class GeneralConfigurationComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  public email: string;

  public facebook: string;
  public instagram: string;

  public gitInfo$: Observable<GitVersion>;

  public configuration: Configuration;

  public appointmentMessage: string;
  public city: string;
  public address: string;
  public phoneNumber: string;
  public workingTimeInfo: string;

  private language: string;

  constructor(
    private generalConfigurationService: GeneralConfigurationService,
    private languagePipe: LanguagePipe) {
  }

  ngOnInit(): void {
    this.language = this.languagePipe.language;

    this.generalConfigurationService.getUsers().subscribe(user => {
      const adminUser = user[0];
      this.email = adminUser.email;
    });

    this.getConfiguration();

    this.gitInfo$ = this.generalConfigurationService.getGitInfo();
  }

  saveSocialMedia() {
    this.configuration.instagram = this.instagram;
    this.configuration.facebook = this.facebook;

    this.saveConfiguration('Social media message');
  }

  saveAppointmentMessage() {
    this.configuration.appointmentSuccessMessage[this.language] = this.appointmentMessage;
    this.saveConfiguration('Appointment message');
  }

  saveContactInfo() {
    this.configuration.city[this.language] = this.city;
    this.configuration.address[this.language] = this.address;
    this.configuration.phoneNumber = this.phoneNumber;
    this.configuration.workingTimeInfo[this.language] = this.workingTimeInfo;

    this.saveConfiguration('Contact info');
  }

  getConfiguration() {
    this.generalConfigurationService.getConfiguration().subscribe(config => {

      this.configuration = config;

      this.appointmentMessage = config.appointmentSuccessMessage[this.language];

      this.city = config.city[this.language];
      this.address = config.address[this.language];
      this.phoneNumber = config.phoneNumber;

      this.facebook = config.facebook;
      this.instagram = config.instagram;

      this.workingTimeInfo = config.workingTimeInfo[this.language];
    });
  }

  private saveConfiguration(message: string) {

    this.generalConfigurationService.saveConfiguration(this.configuration).subscribe(() => {
    }, error => {
      this.notification.showMessage(message + ' has not been updated.', 'warn');
    }, () => {
      this.notification.showMessage(message + ' has been updated successfully.', 'success');
    });
  }
}
