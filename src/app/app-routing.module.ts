import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UnitsSummariesComponent} from './dashboard/units-summaries/units-summaries.component';

const routes: Routes = [
  {path: 'welcome-page', component: WelcomePageComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
      {path: 'summaries', component: UnitsSummariesComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
