import {RouterModule, Routes} from '@angular/router';
import {ForecastsListComponent} from './features/forecasts-list/forecasts-list.component';
import {MainPageComponent} from './features/main-page/main-page.component';
import {ModuleWithProviders} from '@angular/core';

const appRoutes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'forecast/:zipcode', component: ForecastsListComponent
  }
];
export const WeatherRouting: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
