import {Component, ElementRef, HostListener, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BarberService} from '../services/barber.service';
import {ServicesService} from '../services/services.service';
import {ScheduleService} from '../services/schedule.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSidenav} from '@angular/material';
import {AuthenticationService} from '../authentication/authentication.service';
import {Service} from '../interfaces/service';
import {Barber} from '../models/barber';

// TODO: Refactor everything here methods, split into components if you have to, refactor css to make it more readable, delete unused stuff.

interface ServicePictureUpdateRequest {
  serviceId: number;
  picture: File;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  @ViewChild('chooseFile') public chooseFile: ElementRef;
  @ViewChild('profileWrapper') public profileWrapper: ElementRef;

  public barberId;
  public barber = new Barber();

  public services: Service[];

  public selectedFile: File = null;
  public isFileSelected = false;
  public isEditable = false;
  public servicesToBeUpdated: ServicePictureUpdateRequest[] = new Array<ServicePictureUpdateRequest>();

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
    this.route.paramMap.subscribe(data => this.barberId = data.get('id'));

    this.barberService.getBarberByUsername(sessionStorage.getItem('username')).subscribe(b => {
      this.barber = b;
      console.log(this.barber);
    });

    this.servicesService.getAllServices().subscribe(s => {
      this.services = s;
    });


  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.isFileSelected = true;
  }

  onUpload() {
    if (!this.isFileSelected) {
      this.chooseFile.nativeElement.click();
    } else {

      this.barberService.updateBarberPicture(this.barber.id, this.selectedFile).subscribe(d => console.log('upload is comeplete'),
        err => console.log(err),
        () => {
          this.isFileSelected = false;
          this.ngOnInit();
        });
    }
  }

  update() {
    if (!this.isEditable) {
      this.barberService.updateBarber(this.barber).subscribe(response => {
        // sessionStorage.setItem('username', this.barber.id);
      });

      console.log('services: ', this.services);
      console.log('servicesToBeUpdated: ', this.servicesToBeUpdated);

      this.servicesService.updateServices(this.services).subscribe();
    }
  }

  edit() {
    this.isEditable = !this.isEditable;
    this.update();
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

  openServiceDialog(services, theme): void {

    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: '800px',
      data: {
        services

      },
      panelClass: theme
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('services to be updated: ', result);
      this.servicesToBeUpdated = result;
    });
  }
}

@Component({
  selector: 'change-password-dialog',
  templateUrl: 'change-password-dialog.html',
  styleUrls: ['./profile.component.css'],
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

      this.barberService.updateBarberPassword(this.data.barberId, this.newPassword).subscribe(d => {
        if (d === false) {
          alert('old password doesn\'t match');
        }
      }, err => {
      }, () => {
      });
      this.onNoClick();
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


@Component({
  selector: 'service-dialog',
  templateUrl: 'service-dialog.html',
  styleUrls: ['./profile.component.css'],
})
export class ServiceDialogComponent {

  private reader;

  @ViewChild('something', {static: false}) something: ElementRef;
  @ViewChildren('element') viewChildren !: QueryList<ElementRef>;

  public servicesToBeUploaded: ServicePictureUpdateRequest[] = new Array<ServicePictureUpdateRequest>();

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.reader = new FileReader();

    // this.servicesToBeUploaded = this.data.services.map(s => ({s}));
  }

  addService() {

    const last = this.data.services.length;

    const newService = new Service();
    newService.serviceType = '';
    newService.price = 0;
    newService.duration = 0;

    if (last > 0) {
      const service = this.data.services[last - 1];
      newService.id = service.id + 1;

    } else {
      newService.id = 1; // this is 1 one because it represent the first id in a db.
    }

    this.data.services.push(newService);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteService(service: any) {
    service.deleted = true;
  }


  onFileChangedService(event, service) {
    console.log(event);
    const id = event.target.id;

    console.log(id);
    const file = event && event.target.files[0];
    // this.onchange(file);
    const reader = new FileReader();
    reader.readAsDataURL(file); // toBase64
    reader.onload = () => {
      service.picture = reader.result as string;
    };
  }

  // @HostListener('change', ['$event'])
  // emitFiles( event ) {
  //
  //
  // }

  onUploadService(service) {

    this.viewChildren.forEach(element => {

      // + '' is like that because nativeElement.id is a string.
      if (element.nativeElement.id === service.id + '') {
        element.nativeElement.click();
        return;
      }
    });
  }

}
