import {Component, inject, Signal} from '@angular/core';
import {Router} from '@angular/router';
import {ConditionsAndZip} from '../../model/conditions-and-zip.type';
import {CommonModule} from '@angular/common';
import {TabsOutletComponent} from '../../shared/tabs-outlet/tabs-outlet.component';
import {TabDirective} from '../../shared/tab.directive';
import {WeatherService} from '../../services/weather.service';
import {LocationConditionComponent} from './location-condition/location-condition.component';
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  imports: [
    CommonModule,
    TabsOutletComponent,
    TabDirective,
    LocationConditionComponent
  ],
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {
  private router = inject(Router);

  protected readonly weatherService = inject(WeatherService);
  protected readonly locationService = inject(LocationService);
  protected readonly currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.currentConditions;

  protected showForecast(zipcode: string): void {
    this.router.navigate(['/forecast', zipcode]).catch(err => console.error(`Cannot navigate to zipcode ${zipcode}`, err));
  }

  protected onRemoveLocation(zipcode: string): void {
    this.locationService.removeLocation(zipcode);
  }

  protected tabName(location: ConditionsAndZip) {
    return `${location.data.name} (${location.zip})`;
  }
}
