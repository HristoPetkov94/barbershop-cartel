import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {BarberService} from '../services/barber.service';
import {Router} from '@angular/router';
import {AuthenticationService} from "../authentication/authentication.service";

// TODO: Refactor everything here methods, split into components if you have to, refactor css to make it more readable, delete unused stuff.

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('eyebg', {static: false})
  private eye: ElementRef;

  @ViewChild('eyebg2', {static: false})
  private eye2: ElementRef;

  @ViewChild('menucontent', {static: false})
  private menucontent: ElementRef;

  @ViewChild('menuicon', {static: false})
  private menuicon: ElementRef;

  private toggleMenu = false;

  constructor(private http: HttpClient,
              private domSanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry,
              private barberService: BarberService,
              private router: Router,
              public auth: AuthenticationService) {
    this.matIconRegistry.addSvgIcon(
      'knife',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/images/barber-knife.svg'));
  }

  ngOnInit() {
  }

  expandMenuContent(toggle: boolean) {
    this.toggleMenu = !this.toggleMenu;

    if (this.toggleMenu) {
      this.menuicon.nativeElement.classList.add('change');
      this.menucontent.nativeElement.style.width = '500px';
    } else {
      this.menuicon.nativeElement.classList.remove('change');
      this.menucontent.nativeElement.style.width = '0px';
    }
  }

  scrollToElement(team: any) {
    team.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  goToProfile() {
    let barber = null;
    const email = sessionStorage.getItem('username');
    this.barberService.getBarberByUsername(email).subscribe(b => {
        barber = b;
      }, err => {
        console.log(barber);
      },
      () => this.router.navigate(['/profile', barber.id]));


  }

  move(event) {
    const x = (event.clientX) * 100 / window.innerWidth;
    const y = (event.clientY) * 100 / window.innerHeight;

    this.eye.nativeElement.style.left = x + '%';
    this.eye.nativeElement.style.top = y + '%';
  }

}
