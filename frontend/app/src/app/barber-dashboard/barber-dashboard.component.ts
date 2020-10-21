import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-barber-dashboard',
  templateUrl: './barber-dashboard.component.html',
  styleUrls: ['./barber-dashboard.component.css']
})
export class BarberDashboardComponent implements OnInit {

  public barbers = [1, 2, 3];

  constructor() {
  }

  ngOnInit(): void {
  }

}
