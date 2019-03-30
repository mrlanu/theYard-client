import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WelcomePageComponent} from './auth/welcome-page/welcome-page.component';
import {AuthGuard} from './auth/auth.guard';
import {TrailersListComponent} from './dashboard/trailers/trailers-list/trailers-list.component';
import {TrailerDetailsComponent} from './dashboard/trailers/trailer-details/trailer-details.component';
import {TrailerEditComponent} from './dashboard/trailers/trailer-edit/trailer-edit.component';
import {TrailerLogComponent} from './dashboard/trailers/trailer-log/trailer-log.component';
import {BreakingListComponent} from './dashboard/breaking/breaking-list/breaking-list.component';
import {BreakingDetailsComponent} from './dashboard/breaking/breaking-details/breaking-details.component';

const routes: Routes = [
  {path: 'welcome-page', component: WelcomePageComponent},
  {path: 'dashboard', component: DashboardComponent, canActivateChild: [AuthGuard], children: [
      {path: 'trailers-list', component: TrailersListComponent},
      {path: 'trailer-details/:trailerId', component: TrailerDetailsComponent},
      {path: 'trailer-edit', component: TrailerEditComponent},
      {path: 'trailer-log/:trailerId', component: TrailerLogComponent},
      {path: 'breaking-list/:trailerId', component: BreakingListComponent},
      {path: 'breaking-details/:breakingId', component: BreakingDetailsComponent},
    ]},
  {path: '**', redirectTo: '/welcome-page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
