import {RouterModule, Routes} from '@angular/router';
import {ForecastsListComponent} from './forecasts-list/forecasts-list.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ModuleWithProviders} from '@angular/core';

const appRoutes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'forecast/:zipcode', component: ForecastsListComponent
  }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
