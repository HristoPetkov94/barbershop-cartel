import {Component, OnInit} from '@angular/core';
import {Barber} from '../../models/barber.model';
import {BarberService} from '../../services/barber.service';

@Component({
  selector: 'app-availability-configuration',
  templateUrl: './availability-configuration.component.html',
  styleUrls: ['./availability-configuration.component.css']
})
export class AvailabilityConfigurationComponent implements OnInit {

  public barbers: Barber[];
  public selectedBarberId;

  constructor(private barberService: BarberService) {
  }

  ngOnInit(): void {

    this.barberService.getBarbers().subscribe(barbers => {
      this.barbers = barbers;
      this.selectedBarberId = barbers[0].id;
    });
  }

}
