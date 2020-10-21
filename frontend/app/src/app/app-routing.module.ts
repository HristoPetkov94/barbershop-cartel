import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ConfigurationPanelComponent} from './configuration-panel/configuration-panel.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuardService} from './authentication/auth-guard.service';
import {BarberBookNowPanelComponent} from './barber-book-now-panel/barber-book-now-panel.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {BarberDashboardComponent} from './barber-dashboard/barber-dashboard.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'book-now', component: BarberBookNowPanelComponent },
  { path: 'login', component: LoginComponent},
  // { path: 'register', component: RegisterComponent},
  { path: 'configuration', component: ConfigurationPanelComponent, canActivate: [AuthGuardService]},
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: 'dashboard', component: BarberDashboardComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
