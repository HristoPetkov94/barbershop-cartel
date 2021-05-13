import {Component, OnInit, ViewChild} from '@angular/core';
import {EmailDetails} from '../../models/email.details.model';
import {EmailNotificationService} from '../../services/email.notification.service';
import {NotificationComponent} from '../../notification/notification.component';
import {getCookie} from '../../utils/cookie.utils';
import {EmailTypeEnum} from '../../enums/email.type.enum';

@Component({
  selector: 'app-email-configuration',
  templateUrl: './email-configuration.component.html',
  styleUrls: ['./email-configuration.component.css', '../shared-styles/shared.css']
})
export class EmailConfigurationComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  private language: string;
  public emails: EmailDetails[];
  public labels = new Map<EmailTypeEnum, any>();

  constructor(private emailNotificationService: EmailNotificationService) {
  }

  ngOnInit(): void {
    this.language = getCookie('lang');

    this.emailNotificationService.getEmailMessages(this.language).subscribe(data => {
      this.emails = data;
      this.emails.sort((a, b) => a.emailType.toString().localeCompare(b.emailType.toString()));
    });

    this.labels.set(EmailTypeEnum.BOOKING_EMAIL_TYPE,
      {
        header: 'configuration.emails.header_booking_email',
        description: 'configuration.emails.description_booking_email',
      }
    );
    this.labels.set(EmailTypeEnum.FORGOT_PASSWORD_TYPE,
      {
        header: 'configuration.emails.header_forgot_password_email',
        description: 'configuration.emails.description_forgot_password_email'
      });
  }

  saveEmailMessages() {
    this.emailNotificationService.saveEmailMessages(this.emails, this.language).subscribe(() => {
      },
      () => {
        this.notification.showMessage('Booking confirmation email message has not been updated.', 'warn');
      },
      () => {
        this.notification.showMessage('Booking confirmation email message has been updated successfully.', 'success');
      }
    );
  }
}
