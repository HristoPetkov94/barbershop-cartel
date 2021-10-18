import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {fade} from '../animations/fade';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {transitionFade} from '../animations/transition.fade';
import {GeneralConfigurationService} from '../../services/general.configuration.service';
import {Configuration} from '../../models/general.configuration/configuration.model';

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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private generalConfigurationService: GeneralConfigurationService) {

    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        const data = route.snapshot.firstChild.data.title;

        if (data === undefined || data === {}) {
          this.background = '';
        } else {
          this.background = `../../../assets/images/design/${data}-background.png`;
        }
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  private configuration: Configuration;

  ngOnInit(): void {
    this.generalConfigurationService.getConfiguration().subscribe(configuration => {
      this.configuration = configuration;
    });
  }

  book() {
    this.router.navigate(['/book-now']);
  }

  toFacebook() {
    const facebookUrl = this.configuration.facebook;

    if (facebookUrl === '' || facebookUrl === null || facebookUrl === undefined) {
      return;
    }

    // opens in new tab
    window.open(this.configuration.facebook, '_blank');
  }

  toInstagram() {
    const instagramUrl = this.configuration.instagram;

    if (instagramUrl === '' || instagramUrl === null || instagramUrl === undefined) {
      return;
    }

    // opens in new tab
    window.open(this.configuration.instagram, '_blank');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
