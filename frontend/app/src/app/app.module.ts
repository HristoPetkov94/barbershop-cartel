import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LandingPageViewComponent} from './views/landing-page-view/landing-page-view.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule, MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressSpinnerModule, MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {BasicAuthHttpInterceptorService} from './interceptors/basic-auth-http.interceptor.service';
import { RegisterComponent } from './register/register.component';
import { DataConfigurationPanelComponent } from './configuration-panel/data-configuration-panel.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { NumberCardChartComponent } from './charts/number-card-chart/number-card-chart.component';
import { CompactNavbarComponent } from './views/components/compact-navbar/compact-navbar.component';
import { ServiceViewComponent } from './views/service-view/service-view.component';
import { TeamViewComponent } from './views/team-view/team-view.component';
import { BarberPaginatorComponent } from './views/team-view/barber-paginator/barber-paginator.component';
import { FooterComponent } from './views/components/footer/footer.component';
import { I18nModule } from './i18n/i18n.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { GeneralConfigurationComponent } from './admin-configuration-panel/general-configuration/general-configuration.component';
import { BarberConfigurationComponent } from './admin-configuration-panel/barber-configuration/barber-configuration.component';
import { ServiceConfigurationComponent } from './admin-configuration-panel/service-configuration/service-configuration.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NotificationComponent } from './notification/notification.component';
import { ChangePasswordComponent } from './admin-configuration-panel/general-configuration/change-password/change.password.component';
import { NavigationComponent } from './views/components/navigation/navigation.component';
import { ContactViewComponent } from './views/contact-view/contact-view.component';
import { StoreComponent } from './views/store-view/store.component';
import { StoreConfigurationComponent } from './admin-configuration-panel/store-configuration/store-configuration.component';
import { BarberViewComponent } from './admin-configuration-panel/barber-configuration/barber-view/barber-view.component';
import { BarberEditDialogComponent } from './admin-configuration-panel/barber-configuration/barber-edit-dialog/barber-edit-dialog.component';
import { AdminLayoutComponent } from './admin-configuration-panel/admin-layout/admin-layout.component';
import { ServiceConfigurationViewComponent } from './admin-configuration-panel/service-configuration/service-configuration-view/service-configuration-view.component';
import { ServiceEditDialogComponent } from './admin-configuration-panel/service-configuration/service-edit-dialog/service-edit-dialog.component';
import { LayoutComponent } from './views/layout/layout.component';
import { ChangeEmailComponent } from './admin-configuration-panel/general-configuration/change-email/change-email.component';
import { AssignmentConfigurationComponent } from './admin-configuration-panel/assignment-configuration/assignment-configuration.component';
import { AssignmentViewComponent } from './admin-configuration-panel/assignment-configuration/assignment-view/assignment-view.component';
import { AssignmentEditDialogComponent } from './admin-configuration-panel/assignment-configuration/assignment-edit-dialog/assignment-edit-dialog.component';
import {WorkDayViewComponent} from './admin-configuration-panel/availability-configuration/work-day-view/work-day-view.component';
import {WorkDayEditDialogComponent} from './admin-configuration-panel/availability-configuration/work-day-edit-dialog/work-day-edit-dialog.component';
import {WorkWeekDayEditDialogComponent} from './admin-configuration-panel/availability-configuration/work-week-day-edit-dialog/work-week-day-edit-dialog.component';
import {WorkWeekDayViewComponent} from './admin-configuration-panel/availability-configuration/work-week-day-view/work-week-day-view.component';
import {AvailabilityConfigurationComponent} from './admin-configuration-panel/availability-configuration/availability-configuration.component';

import { AppComponentComponent } from './admin-configuration-panel/app-component/app-component.component';
import {CalendarHeaderComponent} from './admin-configuration-panel/app-component/calendar-header.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { BarberStepComponent } from './views/appointment-view/steps/barber-step/barber-step.component';
import { ServiceStepComponent } from './views/appointment-view/steps/service-step/service-step.component';
import { DateStepComponent } from './views/appointment-view/steps/date-step/date-step.component';
import { FinishStepComponent } from './views/appointment-view/steps/finish-step/finish-step.component';
import { AppointmentViewComponent } from './views/appointment-view/appointment-view.component';
import { EmailConfigurationComponent } from './admin-configuration-panel/email-configuration/email-configuration.component';
import {Translate2Pipe} from './pipes/translate-pipe';

@NgModule({
  exports: [
    AppComponentComponent
  ],
  declarations: [
    AppComponent,
    LandingPageViewComponent,
    LoginComponent,
    RegisterComponent,
    DataConfigurationPanelComponent,
    PieChartComponent,
    NumberCardChartComponent,
    ServiceEditDialogComponent,
    CompactNavbarComponent,
    ServiceViewComponent,
    TeamViewComponent,
    BarberPaginatorComponent,
    FooterComponent,
    GeneralConfigurationComponent,
    BarberConfigurationComponent,
    ServiceConfigurationComponent,
    NotificationComponent,
    NavigationComponent,
    ContactViewComponent,
    ChangePasswordComponent,
    StoreComponent,
    StoreConfigurationComponent,
    BarberViewComponent,
    BarberEditDialogComponent,
    AdminLayoutComponent,
    ServiceConfigurationViewComponent,
    ServiceEditDialogComponent,
    ChangeEmailComponent,
    LayoutComponent,
    AssignmentConfigurationComponent,
    AssignmentViewComponent,
    AssignmentEditDialogComponent,
    BarberStepComponent,
    ServiceStepComponent,
    DateStepComponent,
    FinishStepComponent,
    AppointmentViewComponent,
    AppComponentComponent,
    CalendarHeaderComponent,
    AssignmentConfigurationComponent,
    AssignmentViewComponent,
    AssignmentEditDialogComponent,
    AvailabilityConfigurationComponent,
    WorkWeekDayViewComponent,
    WorkWeekDayEditDialogComponent,
    WorkDayViewComponent,
    WorkDayEditDialogComponent,
    EmailConfigurationComponent,
    Translate2Pipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatSelectModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatMenuModule,
        HttpClientModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        SocialLoginModule,
        MatListModule,
        NgxChartsModule,
        MatTableModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatStepperModule,
        MatSliderModule,
        MatCheckboxModule,
        MatTabsModule,
        MatRadioModule,
        I18nModule,
        MatGridListModule,
        MatTooltipModule,
      BrowserAnimationsModule,
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('491244421754834'),
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ServiceEditDialogComponent,
    BarberEditDialogComponent,
    WorkWeekDayEditDialogComponent,
    WorkDayEditDialogComponent
  ]
})
export class AppModule {
}
