import { Component, OnInit } from '@angular/core';
import {fade} from '../animations/fade';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css'], animations: [
    fade
  ]
})
export class ContactViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
