import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneralConfigurationService} from '../../services/general.configuration.service';
import {NotificationComponent} from '../../notification/notification.component';
import {SocialMediaModel} from '../../models/general.configuration/social.media.model';
import {ContactInfoModel} from '../../models/general.configuration/contact.info.model';
import {Observable} from 'rxjs';
import {GitVersion} from '../../models/git-version.mode';
import {User} from '../../models/user.model';
import {Configuration} from '../../models/general.configuration/configuration.model';
import {SocialMediaService} from '../../services/socialmedia.service';
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

  public socialMedia = new SocialMediaModel();
  public contactInfo = new ContactInfoModel();

  public gitInfo$: Observable<GitVersion>;

  private configuration: Configuration;

  constructor(
    private generalConfigurationService: GeneralConfigurationService,
    private socialMediaService: SocialMediaService,
  ) {
  }

  ngOnInit(): void {
    const language = getCookie('lang');

    this.generalConfigurationService.getUsers().subscribe(data => {
      this.users = data;
      const adminUser = this.users[0];
      this.email = adminUser.email;
    });

    this.getConfiguration(language);

    this.socialMediaService.getSocialMedia().subscribe(media => {
      this.socialMedia.facebook = media.facebook;
      this.socialMedia.instagram = media.instagram;
    });

    this.gitInfo$ = this.generalConfigurationService.getGitInfo();
  }

  saveSocialMedia() {
    this.socialMediaService.saveSocialMedia(this.socialMedia).subscribe(() => {
      },
      () => {
        this.notification.showMessage('Social media has not been updated.', 'warn');
      },
      () => {
        this.notification.showMessage('Social media has been updated successfully.', 'success');
      }
    );
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
