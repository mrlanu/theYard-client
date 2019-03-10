import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WelcomePageComponent} from './auth/welcome-page/welcome-page.component';
import {AuthGuard} from './auth/auth.guard';
import {TestComponent} from './dashboard/test/test.component';

const routes: Routes = [
  {path: 'welcome-page', component: WelcomePageComponent},
  {path: 'dashboard', component: DashboardComponent, canActivateChild: [AuthGuard], children: [
      {path: 'test', component: TestComponent}
    ]},
  {path: '**', redirectTo: '/welcome-page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
