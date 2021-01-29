import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneralConfigurationService} from '../../services/general-configuration.service';
import {User} from '../../models/user';
import {NotificationComponent} from '../../notification/notification.component';
import {SocialMediaModel} from '../../models/general.configuration/social.media.model';
import {ContactInfoModel} from '../../models/general.configuration/contact.info.model';

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

  constructor(private generalConfigurationService: GeneralConfigurationService) {
  }

  ngOnInit(): void {
    this.generalConfigurationService.getUsers().subscribe(data => {
      this.users = data;
      const adminUser = this.users[0];
      this.email = adminUser.email;
    });

    this.generalConfigurationService.getFrontPageMessage().subscribe(data => {
      this.frontPageMessage = data;
    });

    this.generalConfigurationService.getAppointmentMessage().subscribe(data => {
      this.appointmentMessage = data;
    });

    this.generalConfigurationService.getSocialMedia().subscribe(data => {
      this.socialMedia = data;
    });

    this.generalConfigurationService.getContactInfo().subscribe(data => {
      this.contactInfo = data;
    });

  }

  saveFrontPageMessage() {
    this.generalConfigurationService.saveFrontPageMessage(this.frontPageMessage).subscribe(data => {

        this.generalConfigurationService.getFrontPageMessage().subscribe(frontPageMessage => {
          this.frontPageMessage = frontPageMessage;
        });
      },
      () => {
        this.notification.showMessage('Front page message has not been updated.', 'warn');
      },
      () => {
        this.notification.showMessage('Front page message has been updated successfully.', 'success');
      }
    );
  }

  saveAppointmentMessage() {
    this.generalConfigurationService.saveAppointmentMessage(this.appointmentMessage).subscribe(data => {

        this.generalConfigurationService.getAppointmentMessage().subscribe(appointmentMessage => {
          this.appointmentMessage = appointmentMessage;
        });
      },
      () => {
        this.notification.showMessage('Appointment success message has not been updated.', 'warn');
      },
      () => {
        this.notification.showMessage('Appointment success message has been updated successfully.', 'success');
      }
    );
  }

  saveSocialMedia() {
    this.generalConfigurationService.saveSocialMedia(this.socialMedia).subscribe(data => {

        this.generalConfigurationService.getSocialMedia().subscribe(socialMedia => {
          this.socialMedia = socialMedia;
        });
      },
      () => {
        this.notification.showMessage('Social media has not been updated.', 'warn');
      },
      () => {
        this.notification.showMessage('Social media has been updated successfully.', 'success');
      }
    );
  }

  saveContactInfo() {
    this.generalConfigurationService.saveContactInfo(this.contactInfo).subscribe(data => {

        this.generalConfigurationService.getContactInfo().subscribe(contactInfo => {
          this.contactInfo = contactInfo;
        });
      },
      () => {
        this.notification.showMessage('Contact info has not been updated.', 'warn');
      },
      () => {
        this.notification.showMessage('Contact info has been updated successfully.', 'success');
      }
    );
  }
}
