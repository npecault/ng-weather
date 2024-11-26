import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ZipcodeEntryComponent} from './zipcode-entry/zipcode-entry.component';
import {ForecastsListComponent} from './forecasts-list/forecasts-list.component';
import {CurrentConditionsComponent} from './current-conditions/current-conditions.component';
import {MainPageComponent} from './main-page/main-page.component';
import {RouterModule} from '@angular/router';
import {routing} from './app.routing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        routing,
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
