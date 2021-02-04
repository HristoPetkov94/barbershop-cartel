import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeViewComponent} from './views/home-view/home-view.component';
import {LoginComponent} from './login/login.component';
import {ConfigurationComponent} from './admin-configuration-panel/configuration.component';
import {AuthGuardService} from './authentication/auth-guard.service';
import {BarberBookNowPanelComponent} from './barber-book-now-panel/barber-book-now-panel.component';
import {BarberDashboardComponent} from './barber-dashboard/barber-dashboard.component';
import {RegisterComponent} from './register/register.component';
import {TeamViewComponent} from './views/team-view/team-view.component';
import {ServiceViewComponent} from './views/service-view/service-view.component';
import {ContactViewComponent} from './views/contact-view/contact-view.component';
import {StoreComponent} from './views/store-view/store.component';


const routes: Routes = [
  { path: '', component: HomeViewComponent },
  { path: 'team', component: TeamViewComponent, data: {animation: 'HomePage'} },
  { path: 'services', component: ServiceViewComponent, data: {animation: 'HomePage'} },
  { path: 'contacts', component: ContactViewComponent, data: {animation: 'HomePage'} },
  { path: 'store', component: StoreComponent, data: {animation: 'HomePage'} },
  { path: 'book-now', component: BarberBookNowPanelComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  // TODO: rename and change path to more appropriate one.
  // { path: 'configuration', component: DataConfigurationPanelComponent, canActivate: [AuthGuardService]},
  { path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuardService]},
  { path: 'dashboard', component: BarberDashboardComponent, canActivate: [AuthGuardService]},

  { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
