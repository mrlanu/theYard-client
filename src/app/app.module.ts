import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {HeaderComponent} from './dashboard/navigation/header/header.component';
import {SidenavListComponent} from './dashboard/navigation/sidenav-list/sidenav-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {WelcomePageComponent} from './auth/welcome-page/welcome-page.component';
import {UiService} from './shared/ui.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth.interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';
import { TrailersListComponent } from './dashboard/trailers/trailers-list/trailers-list.component';
import { TrailerDetailsComponent } from './dashboard/trailers/trailer-details/trailer-details.component';
import {HttpService} from './http.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WelcomePageComponent,
    DashboardComponent,
    SignupComponent,
    LoginComponent,
    TrailersListComponent,
    TrailerDetailsComponent,
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UiService, AuthService, AuthGuard, HttpService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
