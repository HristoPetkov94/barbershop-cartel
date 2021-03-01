import {Component} from '@angular/core';
import {NavigationComponent} from '../navigation/navigation.component';

@Component({
  selector: 'app-compact-navbar',
  templateUrl: './compact-navbar.component.html',
  styleUrls: ['./compact-navbar.component.css']
})
export class CompactNavbarComponent extends NavigationComponent {
  public hideBurger = false;
}
