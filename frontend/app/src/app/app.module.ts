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
import {BookingViewComponent} from './views/booking-view/booking-view.component';
import { BarberCalendarComponent } from './barber-calendar/barber-calendar.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
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
    BookingViewComponent,
    BarberCalendarComponent,
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
    ServiceEditDialogComponent,
    BarberEditDialogComponent
  ]
})
export class AppModule {
}
