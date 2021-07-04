import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneralConfigurationService} from '../../services/general.configuration.service';
import {NotificationComponent} from '../../notification/notification.component';
import {ContactInfoModel} from '../../models/general.configuration/contact.info.model';
import {Observable} from 'rxjs';
import {GitVersion} from '../../models/git-version.mode';
import {User} from '../../models/user.model';
import {Configuration} from '../../models/general.configuration/configuration.model';
import {getCookie} from '../../utils/cookie.utils';

@Component({
  selector: 'app-general-configuration',
  templateUrl: './general-configuration.component.html',
  styleUrls: ['./general-configuration.component.css', '../shared-styles/shared.css']
})
export class GeneralConfigurationComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  public users: User[];
  public email: string;

  public frontPageMessage: string;
  public appointmentMessage: string;

  public facebook: string;
  public instagram: string;

  public contactInfo = new ContactInfoModel();

  public gitInfo$: Observable<GitVersion>;

  private configuration: Configuration;

  constructor(
    private generalConfigurationService: GeneralConfigurationService) {
  }

  ngOnInit(): void {
    const language = getCookie('lang');

    this.generalConfigurationService.getUsers().subscribe(data => {
      this.users = data;
      const adminUser = this.users[0];
      this.email = adminUser.email;
    });

    this.getConfiguration(language);

    this.gitInfo$ = this.generalConfigurationService.getGitInfo();
  }

  saveSocialMedia() {
    this.configuration.socialMediaInstagram = this.instagram;
    this.configuration.socialMediaFacebook = this.facebook;

    this.saveConfiguration('Social media message');
  }

  saveFrontPageMessage() {
    this.configuration.frontPageMessage = this.frontPageMessage;
    this.saveConfiguration('Front page message');
  }

  saveAppointmentMessage() {
    this.configuration.appointmentSuccessMessage = this.appointmentMessage;
    this.saveConfiguration('Appointment message');
  }

  saveContactInfo() {
    this.configuration.city = this.contactInfo.city;
    this.configuration.address = this.contactInfo.address;
    this.configuration.phoneNumber = this.contactInfo.phoneNumber;

    this.saveConfiguration('Contact info');
  }

  getConfiguration(language) {
    this.generalConfigurationService.getConfiguration(language).subscribe(config => {

      this.configuration = config;

      this.frontPageMessage = config.frontPageMessage;
      this.appointmentMessage = config.appointmentSuccessMessage;

      this.contactInfo.city = config.city;
      this.contactInfo.address = config.address;
      this.contactInfo.phoneNumber = config.phoneNumber;

      this.facebook = config.socialMediaFacebook;
      this.instagram = config.socialMediaInstagram;

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
