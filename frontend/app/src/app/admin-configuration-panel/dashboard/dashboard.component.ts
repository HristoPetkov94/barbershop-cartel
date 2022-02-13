import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {BarberService} from '../../services/barber.service';
import {DashboardService} from '../../services/dashboard.service';
import {DashboardRequestModel} from '../../models/dashboard/dashboard.request.model';
import {DashboardResponseModel} from '../../models/dashboard/dashboard.response.model';
import {NotificationComponent} from '../../notification/notification.component';
import {BarberCheckboxModel} from '../../models/dashboard/barber.checkbox.model';
import {LanguagePipe} from '../../pipes/language-pipe';
import {DateAdapter} from '@angular/material/core';
import {DashboardRadioButtonsEnum} from '../../enums/dashboard.radio.buttons.enum';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../shared-styles/shared.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  public barbers: BarberCheckboxModel[] = [];

  public radioButtonSelection = DashboardRadioButtonsEnum.TODAY;

  public startDate: Date;
  public endDate: Date;
  public today = new Date();

  public todayEnum = DashboardRadioButtonsEnum.TODAY;
  public periodEnum = DashboardRadioButtonsEnum.PERIOD;

  public responseModel: DashboardResponseModel = new DashboardResponseModel();

  public isAllCheckboxSelected: boolean;

  private dateFormat = 'dd-MM-yyyy';

  constructor(private barberService: BarberService,
              private languagePipe: LanguagePipe,
              private dashboardService: DashboardService,
              private dateAdapter: DateAdapter<Date>,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.dateAdapter.getFirstDayOfWeek = () => 1;

    this.barberService.getBarbers().subscribe(barbers => {
      this.barbers = barbers.map(barber => ({...barber, isChecked: false}));
    });
  }

  generateReport() {

    const barberIds = this.barbers.filter(barber => barber.isChecked).map(barber => barber.id);

    let requestModel;

    if (this.radioButtonSelection === DashboardRadioButtonsEnum.TODAY) {

      const today = this.datePipe.transform(this.today, this.dateFormat);

      requestModel = new DashboardRequestModel(barberIds, today, today);
    } else {

      const startDate = this.datePipe.transform(this.startDate, this.dateFormat);
      const endDate = this.datePipe.transform(this.endDate, this.dateFormat);

      requestModel = new DashboardRequestModel(barberIds, startDate, endDate);
    }

    this.dashboardService.generateReport(requestModel).subscribe(responseModel => {
      this.responseModel = responseModel;
    });
  }

  getBarberNames(): string {

    if (this.responseModel === undefined) {
      return '';
    }

    const names = [];

    const selectedBarbers = this.barbers.filter(barber => barber.isChecked);

    for (const barber of selectedBarbers) {

      const firstName = this.languagePipe.transform(barber.firstName);
      const lastName = this.languagePipe.transform(barber.lastName);

      names.push(firstName + ' ' + lastName);
    }

    return names.join(', ');
  }

  onChangeDateFrom(value) {
    this.startDate = value;
  }

  onChangeDateTo(value) {
    this.endDate = value;
  }

  selectAllCheckboxes(checked: boolean) {
    this.isAllCheckboxSelected = checked;

    if (this.barbers == null) {
      return;
    }

    this.barbers.forEach(b => (b.isChecked = checked));
  }

  noCheckboxSelected() {
    return this.barbers.length > 0 && this.barbers.every(b => !b.isChecked);
  }

  updateAllCheckboxes() {
    this.isAllCheckboxSelected = this.barbers != null && this.barbers.every(b => b.isChecked);
  }

  someCheckboxSelected(): boolean {
    if (this.barbers == null) {
      return false;
    }
    return this.barbers.filter(b => b.isChecked).length > 0 && !this.isAllCheckboxSelected;
  }

  validateGenerateButton() {

    if (this.radioButtonSelection === this.todayEnum) {
      return this.noCheckboxSelected();
    }

    return this.noCheckboxSelected() || (this.startDate === undefined || this.endDate === undefined);
  }

  getTotalPrice(): number {

    if (this.responseModel === undefined) {
      return 0;
    }

    let totalPrice = 0;

    for (const report of this.responseModel.barberReports) {
      for (const day of report.days) {
        for (const appointment of day.appointments) {
          totalPrice += appointment.price;
        }
      }
    }

    return totalPrice;
  }

  getTotalAppointments(): number {

    if (this.responseModel === undefined) {
      return 0;
    }

    let totalAppointments = 0;

    for (const report of this.responseModel.barberReports) {
      for (const day of report.days) {
        totalAppointments += day.appointments.length;
      }
    }

    return totalAppointments;
  }
}
