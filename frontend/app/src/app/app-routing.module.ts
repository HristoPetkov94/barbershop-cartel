import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {DataConfigurationPanelComponent} from './configuration-panel/data-configuration-panel.component';
import {ConfigurationComponent} from './admin-configuration-panel/configuration.component';
import {AuthGuardService} from './authentication/auth-guard.service';
import {BarberBookNowPanelComponent} from './barber-book-now-panel/barber-book-now-panel.component';
import {BarberDashboardComponent} from './barber-dashboard/barber-dashboard.component';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book-now', component: BarberBookNowPanelComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  // TODO: rename and change path to more appropriate one.
  // { path: 'configuration', component: DataConfigurationPanelComponent, canActivate: [AuthGuardService]},
  { path: 'configuration', component: ConfigurationComponent},
  { path: 'dashboard', component: BarberDashboardComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
