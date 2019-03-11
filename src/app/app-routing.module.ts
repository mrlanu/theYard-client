import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WelcomePageComponent} from './auth/welcome-page/welcome-page.component';
import {AuthGuard} from './auth/auth.guard';
import {TrailersListComponent} from './dashboard/trailers/trailers-list/trailers-list.component';
import {TrailerDetailsComponent} from './dashboard/trailers/trailer-details/trailer-details.component';

const routes: Routes = [
  {path: 'welcome-page', component: WelcomePageComponent},
  {path: 'dashboard', component: DashboardComponent, canActivateChild: [AuthGuard], children: [
      {path: 'trailers-list', component: TrailersListComponent},
      {path: 'trailer-details/:trailerNumber', component: TrailerDetailsComponent}
    ]},
  {path: '**', redirectTo: '/welcome-page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
