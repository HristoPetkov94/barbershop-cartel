import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ConfigurationPanelComponent} from './configuration-panel/configuration-panel.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuardService} from './authentication/auth-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'configuration', component: ConfigurationPanelComponent, canActivate: [AuthGuardService]},
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
