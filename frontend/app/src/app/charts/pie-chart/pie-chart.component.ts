import { Component, OnInit } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  single: any[];
  view: any[] = [900, 400];

  // options
  gradient = true;

  colorScheme = {
    domain: ['#69f0ae', '#9c27b0', '#f44336', '#1e1e1e']
  };

  constructor() {
    Object.assign(this, { single });
  }

  ngOnInit(): void {
  }

  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
