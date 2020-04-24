import {Component, OnInit} from '@angular/core';
import {BarberService} from '../../services/barber.service';
import {Barber} from '../../models/barber';
// TODO: Refactor everything here methods, split into components if you have to, refactor css to make it more readable, delete unused stuff.
// TODO: Link with services.

@Component({
  selector: 'app-team-stack',
  templateUrl: './team-stack.component.html',
  styleUrls: ['./team-stack.component.css']
})
export class TeamStackComponent implements OnInit {

  private barbers: Barber[];

  constructor(private barberService: BarberService) {
  }

  ngOnInit() {
    this.barberService.getBarbers().subscribe(b => this.barbers = b);
  }

}
