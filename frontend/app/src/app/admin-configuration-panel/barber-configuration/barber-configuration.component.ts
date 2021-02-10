import {Component, OnInit } from '@angular/core';
import {BarberService} from '../../services/barber.service';
import {Barber} from '../../models/barber.model';

@Component({
  selector: 'app-barber-configuration',
  templateUrl: './barber-configuration.component.html',
  styleUrls: ['./barber-configuration.component.css', '../shared-styles/shared.css']
})
export class BarberConfigurationComponent implements OnInit {

  public barbers: Barber[];
  public loading = true;

  constructor(private barberService: BarberService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData() {
    this.barberService.getBarbers().subscribe(data => {
      this.barbers = data;
    }, () => {
    }, () => {
      this.barbers.sort((a, b) => a.id - b.id);
      this.loading = false;
    });
  }

  add() {
    this.barbers.unshift(new Barber());
  }
}
