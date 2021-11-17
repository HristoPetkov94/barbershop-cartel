import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {AvailabilityConfigurationComponent} from './admin-configuration-panel/availability-configuration/availability-configuration.component';
import {AppointmentViewComponent} from './views/appointment-view/appointment-view.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EmailConfigurationComponent} from './admin-configuration-panel/email-configuration/email-configuration.component';
import {CalendarComponent} from './admin-configuration-panel/calendar-component/calendar.component';
import {ClientsConfigurationComponent} from './admin-configuration-panel/clients-configuration/clients-configuration.component';


const routes: Routes = [
  // user visible
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {path: 'home', component: LandingPageViewComponent, data: {animation: 'home'}},
      {path: 'team', component: TeamViewComponent, data: {title: 'team', animation: 'team'}},
      {path: 'services', component: ServiceViewComponent, data: {title: 'services', animation: 'services'}},
      {path: 'contacts', component: ContactViewComponent, data: {title: 'contacts', animation: 'contacts'}},
      {path: 'store', component: StoreComponent, data: {title: 'store', animation: 'store'}},
      {path: 'book-now', component: AppointmentViewComponent, data: {title: 'book-now', animation: 'book-now'}},
    ],
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // admin visible
  {
    path: 'configuration',
    component: AdminLayoutComponent,
    children: [
      {path: 'general', component: GeneralConfigurationComponent, data: {animation: 'general'}},
      {path: 'barbers', component: BarberConfigurationComponent, data: {animation: 'barbers'}},
      {path: 'services', component: ServiceConfigurationComponent, data: {animation: 'services'}},
      {path: 'assignments', component: AssignmentConfigurationComponent, data: {animation: 'assignments'}},
      {path: 'emails', component: EmailConfigurationComponent, data: {animation: 'emails'}},
      {path: 'store', component: StoreConfigurationComponent, data: {animation: 'store'}},
      {path: 'general', component: GeneralConfigurationComponent},
      {path: 'barbers', component: BarberConfigurationComponent},
      {path: 'services', component: ServiceConfigurationComponent},
      {path: 'assignments', component: AssignmentConfigurationComponent},
      {path: 'availability', component: AvailabilityConfigurationComponent},
      {path: 'store', component: StoreConfigurationComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: 'clients', component: ClientsConfigurationComponent },
    ],
    canActivate: [AuthGuardService]
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
