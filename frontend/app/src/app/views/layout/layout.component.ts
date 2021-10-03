import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {fade} from '../animations/fade';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {transitionFade} from '../animations/transition.fade';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'], animations: [
    transitionFade,
    fade,
  ]
})
export class LayoutComponent implements OnInit {
  background: any;

  constructor(private router: Router, private route: ActivatedRoute) {

    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        const data = route.snapshot.firstChild.data.title;

        if (data === undefined || data === {}) {
          this.background = '';
        }

        else {
          this.background = `../../../assets/images/design/${data}-background.png`;
        }
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  ngOnInit(): void {

  }

  book() {
    this.router.navigate(['/book-now']);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
