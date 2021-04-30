import {Component, OnInit, ViewChild} from '@angular/core';
import {EmailDetails} from '../../models/email.details.model';
import {EmailNotificationService} from '../../services/email.notification.service';
import {NotificationComponent} from '../../notification/notification.component';

@Component({
  selector: 'app-email-configuration',
  templateUrl: './email-configuration.component.html',
  styleUrls: ['./email-configuration.component.css', '../shared-styles/shared.css']
})
export class EmailConfigurationComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  public emails: EmailDetails[];

  constructor(private emailNotificationService: EmailNotificationService) {
  }

  ngOnInit(): void {
    this.emailNotificationService.getBookingEmailMessage().subscribe(data => {
      this.emails = data;
    });
  }

  saveEmailMessages() {
    this.emailNotificationService.saveBookingEmailMessage(this.emails).subscribe(() => {
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
