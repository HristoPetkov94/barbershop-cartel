import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {fade} from '../animations/fade';
import {Router} from '@angular/router';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page-view.component.html',
  styleUrls: ['./landing-page-view.component.css'], animations: [
    fade
  ],
  encapsulation: ViewEncapsulation.None,
})

export class LandingPageViewComponent implements OnInit {

  public facebook: string;
  public instagram: string;

  constructor(
    private router: Router) {
  }

  ngOnInit() {
  }

  book() {
    this.router.navigate(['/book-now']);
  }
}
