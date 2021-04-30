import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageViewComponent} from './views/landing-page-view/landing-page-view.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './authentication/auth-guard.service';
import {RegisterComponent} from './register/register.component';
import {TeamViewComponent} from './views/team-view/team-view.component';
import {ServiceViewComponent} from './views/service-view/service-view.component';
import {ContactViewComponent} from './views/contact-view/contact-view.component';
import {StoreComponent} from './views/store-view/store.component';
import {AdminLayoutComponent} from './admin-configuration-panel/admin-layout/admin-layout.component';
import {BarberConfigurationComponent} from './admin-configuration-panel/barber-configuration/barber-configuration.component';
import {GeneralConfigurationComponent} from './admin-configuration-panel/general-configuration/general-configuration.component';
import {ServiceConfigurationComponent} from './admin-configuration-panel/service-configuration/service-configuration.component';
import {StoreConfigurationComponent} from './admin-configuration-panel/store-configuration/store-configuration.component';
import {AssignmentConfigurationComponent} from './admin-configuration-panel/assignment-configuration/assignment-configuration.component';
import {LayoutComponent} from './views/layout/layout.component';
import {AppointmentViewComponent} from './views/appointment-view/appointment-view.component';
import {EmailConfigurationComponent} from './admin-configuration-panel/email-configuration/email-configuration.component';


const routes: Routes = [
  // user visible
  {path: '', component: LandingPageViewComponent},
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'team', component: TeamViewComponent},
      {path: 'services', component: ServiceViewComponent},
      {path: 'contacts', component: ContactViewComponent},
      {path: 'store', component: StoreComponent},
      {path: 'book-now', component: AppointmentViewComponent},
    ],
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // admin visible
  {
    path: 'configuration',
    component: AdminLayoutComponent,
    children: [
      {path: 'general', component: GeneralConfigurationComponent},
      {path: 'barbers', component: BarberConfigurationComponent},
      {path: 'services', component: ServiceConfigurationComponent},
      {path: 'assignments', component: AssignmentConfigurationComponent},
      {path: 'emails', component: EmailConfigurationComponent},
      {path: 'store', component: StoreConfigurationComponent},
    ],
    canActivate: [AuthGuardService]
  },
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
