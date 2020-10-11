import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-barber-team-panel',
  templateUrl: './barber-team-panel.component.html',
  styleUrls: ['./barber-team-panel.component.css']
})
export class BarberTeamPanelComponent implements OnInit {

  public data = [1, 2, 3, 4, 5, 6, 7];

  constructor() {
  }

  ngOnInit() {
  }
}
