import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-compact-navbar',
  templateUrl: './compact-navbar.component.html',
  styleUrls: ['./compact-navbar.component.css']
})
export class CompactNavbarComponent implements OnInit {

  @Output()
  private navigation = new EventEmitter<string>();

  private hideBurger = false;

  constructor() {
  }

  ngOnInit() {
  }

  navigate(destination: string) {
    this.navigation.emit(destination);
  }
}
