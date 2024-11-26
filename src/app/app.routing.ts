import {Routes} from '@angular/router';
import {ForecastsListComponent} from './features/forecasts-list/forecasts-list.component';
import {MainPageComponent} from './features/main-page/main-page.component';

export const WeatherRoutes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'forecast/:zipcode', component: ForecastsListComponent
  }
];

