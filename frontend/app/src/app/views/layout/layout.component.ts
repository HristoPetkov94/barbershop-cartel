import { Component, OnInit } from '@angular/core';
import {fade} from '../animations/fade';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'] , animations: [
    fade
  ]
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
