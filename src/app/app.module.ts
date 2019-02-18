import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {HeaderComponent} from './dashboard/navigation/header/header.component';
import {SidenavListComponent} from './dashboard/navigation/sidenav-list/sidenav-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UnitsSorterComponent } from './dashboard/units-summaries/units-sorter/units-sorter.component';
import { UnitsSummariesComponent } from './dashboard/units-summaries/units-summaries.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WelcomePageComponent,
    DashboardComponent,
    UnitsSorterComponent,
    UnitsSummariesComponent
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
