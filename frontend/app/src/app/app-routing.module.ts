import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageViewComponent} from './views/landing-page-view/landing-page-view.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './authentication/auth-guard.service';
import {BookingViewComponent} from './views/booking-view/booking-view.component';
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
import {BookViewComponent} from './views/book-view/book-view.component';
import {BarberStepComponent} from './views/book-view/steps/barber-step-component/barber-step.component';
import {ServiceStepComponent} from './views/book-view/steps/service-step/service-step.component';
import {DateStepComponent} from './views/book-view/steps/date-step/date-step.component';
import {FinishStepComponent} from './views/book-view/steps/finish-step/finish-step.component';


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
      // {path: 'book-now', component: BookingViewComponent},
      {
        path: 'book-now', component: BookViewComponent, children: [
          {path: 'barber', component: BarberStepComponent},
          {path: 'service/:barberId', component: ServiceStepComponent},
          {path: 'datetime/:barberId/:serviceId', component: DateStepComponent},
          {path: 'finish', component: FinishStepComponent},
        ],
      },
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
