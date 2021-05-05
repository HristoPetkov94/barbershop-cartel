import {Component, OnInit} from '@angular/core';
import {BarberService} from '../../services/barber.service';
import {Barber} from '../../models/barber.model';

@Component({
  selector: 'app-assignment-configuration',
  templateUrl: './assignment-configuration.component.html',
  styleUrls: ['./assignment-configuration.component.css', '../shared-styles/shared.css'],
})
export class AssignmentConfigurationComponent implements OnInit {
  public barbers: Barber[];
  public selectedBarberId = 0;

  constructor(private barberService: BarberService) {
  }

  ngOnInit(): void {
    this.barberService.getBarbers().subscribe(barbers => {
      this.barbers = barbers;
    });
  }
}
