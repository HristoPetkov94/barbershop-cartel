import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeViewComponent} from './views/home-view/home-view.component';
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
import { LogoutComponent } from './logout/logout.component';
import { DataConfigurationPanelComponent } from './configuration-panel/data-configuration-panel.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { NumberCardChartComponent } from './charts/number-card-chart/number-card-chart.component';
import {ChangePasswordDialogComponent, ConfigurationComponent} from './admin-configuration-panel/configuration.component';
import { BookedUsersTableComponent } from './booked-users-table/booked-users-table.component';
import { CompactNavbarComponent } from './compact-navbar/compact-navbar.component';
import { ServiceViewComponent } from './views/service-view/service-view.component';
import { TeamViewComponent } from './views/team-view/team-view.component';
import { BarberPaginatorComponent } from './barber-paginator/barber-paginator.component';
import { FooterComponent } from './views/components/footer/footer.component';
import { I18nModule } from './i18n/i18n.module';
import { BarberBookNowPanelComponent } from './barber-book-now-panel/barber-book-now-panel.component';
import { BarberCalendarComponent } from './barber-calendar/barber-calendar.component';
import { BarberDashboardComponent } from './barber-dashboard/barber-dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { GeneralConfigurationComponent } from './admin-configuration-panel/general-configuration/general-configuration.component';
import { BarberConfigurationComponent } from './admin-configuration-panel/barber-configuration/barber-configuration.component';
import { ServicesConfigurationComponent } from './admin-configuration-panel/services-configuration/services-configuration.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ServiceDialogComponent} from './admin-configuration-panel/services-configuration/dialogs/service-dialog/service-dialog.component';
import { NotificationComponent } from './notification/notification.component';
import { ChangePasswordComponent } from './admin-configuration-panel/general-configuration/change-password/change.password.component';
import { NavigationComponent } from './views/components/navigation/navigation.component';
import { ContactViewComponent } from './views/contact-view/contact-view.component';
import { StoreComponent } from './views/store-view/store.component';
import { StoreConfigurationComponent } from './admin-configuration-panel/store-configuration/store-configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    DataConfigurationPanelComponent,
    PieChartComponent,
    NumberCardChartComponent,
    ConfigurationComponent,
    BookedUsersTableComponent,
    ChangePasswordDialogComponent,
    ServiceDialogComponent,
    CompactNavbarComponent,
    ServiceViewComponent,
    TeamViewComponent,
    BarberPaginatorComponent,
    FooterComponent,
    BarberBookNowPanelComponent,
    BarberCalendarComponent,
    BarberDashboardComponent,
    GeneralConfigurationComponent,
    BarberConfigurationComponent,
    ServicesConfigurationComponent,
    NotificationComponent,
    NavigationComponent,
    ContactViewComponent,
    ChangePasswordComponent,
    StoreComponent,
    StoreConfigurationComponent,
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
        ReactiveFormsModule,
        MatToolbarModule,
        MatMenuModule,
        HttpClientModule,
        ReactiveFormsModule,
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
        MatTooltipModule
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
    ChangePasswordDialogComponent,
    ServiceDialogComponent
  ]
})
export class AppModule {
}
