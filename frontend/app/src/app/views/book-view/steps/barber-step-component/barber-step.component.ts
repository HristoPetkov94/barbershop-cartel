import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BarberService} from '../../../../services/barber.service';
import {Barber} from '../../../../models/barber.model';

@Component({
  selector: 'app-barber-step-component',
  templateUrl: './barber-step.component.html',
  styleUrls: ['./barber-step.component.css']
})
export class BarberStepComponent implements OnInit {

  barbers: Barber[];

  constructor(
    private router: Router,
    private barberService: BarberService) {
  }

  ngOnInit(): void {
    this.barberService.getBarbers().subscribe(barbers => {
      console.log('loading barbers...');

      this.barbers = barbers;
    });
  }

  next(barber: Barber) {
    this.router.navigate(['/book-now/service', barber.id]);
  }
}
