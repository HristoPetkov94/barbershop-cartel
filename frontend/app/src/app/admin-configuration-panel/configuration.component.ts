import {Component, ElementRef, HostListener, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BarberService} from '../services/barber.service';
import {ServicesService} from '../services/services.service';
import {ScheduleService} from '../services/schedule.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSidenav} from '@angular/material';
import {AuthenticationService} from '../authentication/authentication.service';
import {Service} from '../interfaces/service';
import {Barber} from '../models/barber.model';

// TODO: Refactor everything here methods, split into components if you have to, refactor css to make it more readable, delete unused stuff.

interface ServicePictureUpdateRequest {
  serviceId: number;
  picture: File;
}

@Component({
  selector: 'app-profile',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css', './shared-styles/shared.css']
})
export class ConfigurationComponent implements OnInit {

  public tab = 'general';

  @ViewChild('sidenav') public sidenav: MatSidenav;
  @ViewChild('chooseFile') public chooseFile: ElementRef;
  @ViewChild('profileWrapper') public profileWrapper: ElementRef;

  public barber = new Barber();

  public services: Service[];
  public barbers: Barber[];

  public selectedFile: File = null;

  public theme = 'light-theme';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private barberService: BarberService,
              private servicesService: ServicesService,
              private scheduleService: ScheduleService,
              private auth: AuthenticationService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  close() {
    this.sidenav.close();
  }

  logout() {
    this.auth.logOut();
    this.router.navigate(['login']);
  }

  // TODO: these can be handled better.

  deleteService(service) {
    service.deleted = true;
  }

  changeTheme() {
    console.log('changing theme');

    this.theme = this.theme === 'light-theme' ? 'cartel-theme' : 'light-theme';
  }

  openChangePassDialog(theme): void {

    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '500px',
      data: {
        barberId: this.barber.id,

      },
      panelClass: theme
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  isFocused($event: any) {
    const element = $event.target || $event.srcElement || $event.currentTarget;
    return element.nativeElement.id === this.tab;
  }

  setTab(tab: string) {
    this.tab = tab;

    this.clearSelected();
    this.setSelected(tab);
  }

  private clearSelected() {

    const allLiElements = document.getElementsByTagName('li');
    for (let i = 0; i < allLiElements.length; i++) {
      const element = allLiElements[i];

      element.classList.remove('selected');
    }
  }

  private setSelected(tab: string) {
    const element = document.getElementById(tab);
    element.classList.add('selected');
  }
}

@Component({
  selector: 'change-password-dialog',
  templateUrl: 'change-password-dialog.html',
  styleUrls: ['./configuration.component.css'],
})
export class ChangePasswordDialogComponent {
  public hideOldPassword = true;
  public hideNewPassword = true;
  public hideConfirmPassword = true;

  public oldPassword = '';
  public newPassword = '';
  public confirmPassword = '';

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private barberService: BarberService) {
  }

  onSaveClick(): void {
    const newPasswordCase = this.newPassword !== '' && this.newPassword !== undefined;
    const confirmPasswordCase = this.newPassword === this.confirmPassword;

    if (newPasswordCase && confirmPasswordCase) {

      // this.barberService.updateBarberPassword(this.data.barberId, this.newPassword).subscribe(d => {
      //   if (d === false) {
      //     alert('old password doesn\'t match');
      //   }
      // }, err => {
      // }, () => {
      // });
      // this.onNoClick();
    } else {
      if (!newPasswordCase) {
        alert('new password is empty');
      }

      if (!confirmPasswordCase) {
        alert('passwords don\'t match');
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
