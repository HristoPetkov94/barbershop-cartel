import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ConfigurationComponent} from './admin-configuration-panel/configuration.component';
import {AuthGuardService} from './authentication/auth-guard.service';
import {BarberBookNowPanelComponent} from './barber-book-now-panel/barber-book-now-panel.component';
import {BarberDashboardComponent} from './barber-dashboard/barber-dashboard.component';
import {RegisterComponent} from './register/register.component';
import {BarberTeamPanelComponent} from './barber-team-panel/barber-team-panel.component';
import {BarberServicesPanelComponent} from './barber-services-panel/barber-services-panel.component';
import {ContactsStackComponent} from './stacks/contacts-stack/contacts-stack.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: '**', redirectTo: '/'},

  { path: 'team', component: BarberTeamPanelComponent, data: {animation: 'HomePage'} },
  { path: 'services', component: BarberServicesPanelComponent, data: {animation: 'HomePage'} },
  { path: 'contacts', component: ContactsStackComponent, data: {animation: 'HomePage'} },

  { path: 'book-now', component: BarberBookNowPanelComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  // TODO: rename and change path to more appropriate one.
  // { path: 'configuration', component: DataConfigurationPanelComponent, canActivate: [AuthGuardService]},
  { path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuardService]},
  { path: 'dashboard', component: BarberDashboardComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
