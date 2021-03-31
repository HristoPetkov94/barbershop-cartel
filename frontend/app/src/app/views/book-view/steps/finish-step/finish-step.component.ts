import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-finish-step',
  templateUrl: './finish-step.component.html',
  styleUrls: ['./finish-step.component.css']
})
export class FinishStepComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  next() {
    this.router.navigate(['/']);
  }
}
