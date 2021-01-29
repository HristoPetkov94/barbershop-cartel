import {Component, OnInit} from '@angular/core';
import {Barber} from '../../models/barber.model';
import {BarberService} from '../../services/barber.service';

@Component({
  selector: 'app-barber-team-panel',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {

  public barbers: Barber[] = [];

  constructor(private barberService: BarberService) {
  }

  ngOnInit() {
    this.barberService.getBarbers().subscribe(barbers => {
      this.barbers = barbers;
    });
  }
}
