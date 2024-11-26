import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ZipcodeEntryComponent} from './features/main-page/zipcode-entry/zipcode-entry.component';
import {ForecastsListComponent} from './features/forecasts-list/forecasts-list.component';
import {CurrentConditionsComponent} from './features/current-conditions/current-conditions.component';
import {MainPageComponent} from './features/main-page/main-page.component';
import {RouterModule} from '@angular/router';
import {WeatherRouting} from './app.routing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        WeatherRouting,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
    ],
    declarations: [
        AppComponent,
        ZipcodeEntryComponent,
        ForecastsListComponent,
        CurrentConditionsComponent,
        MainPageComponent
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())],
    bootstrap: [AppComponent]
})
export class AppModule {
}
