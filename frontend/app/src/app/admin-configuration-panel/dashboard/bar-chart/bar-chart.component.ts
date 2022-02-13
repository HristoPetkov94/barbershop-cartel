import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {DashboardResponseModel} from '../../../models/dashboard/dashboard.response.model';
import {BarberCheckboxModel} from '../../../models/dashboard/barber.checkbox.model';
import {LanguagePipe} from '../../../pipes/language-pipe';
import {BarberReportModel} from '../../../models/dashboard/barberReportModel';
import * as moment from 'moment';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input()
  public responseModel: DashboardResponseModel;

  @Input()
  public barbers: BarberCheckboxModel[];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 1,
          min: 0
        }
      }]
    }
  };

  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[];
  private dateFormat = 'DD-MMM-YY';

  constructor(private languagePipe: LanguagePipe) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.barChartData = [];

    for (const report of this.responseModel.barberReports) {

      const barber = this.barbers.find(b => b.id === report.barberId);
      const label = this.getLabel(barber);

      const newDataset = {
        label,
        data: report.days.map(day => day.appointments.length),
      };

      // y values
      this.barChartData.push(newDataset);
    }

    // x values
    this.barChartLabels = this.getChartLabels(this.responseModel.barberReports);

  }

  ngOnInit(): void {
    // y default values
    this.barChartData.push({
      data: [0],
    });

    // x default values
    this.barChartLabels = ['0'];
  }

  getLabel(barber) {
    const firstName = this.languagePipe.transform(barber.firstName);
    const lastName = this.languagePipe.transform(barber.lastName);

    return `${firstName} ${lastName}`;
  }

  getChartLabels(barberReports: BarberReportModel[]) {

    const days = [];

    for (const report of barberReports) {
      for (const day of report.days) {

        if (!days.includes(day.date)) {
          const formattedDate = moment(day.date).format(this.dateFormat);
          days.push(formattedDate);
        }
      }
    }

    return days;
  }
}
