import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { JoyrideModule } from 'ngx-joyride';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HeaderModule } from 'od-internal-header';
import { environment } from '../environments/environment';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { CacheMapService } from './services/cache-map.service';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    JoyrideModule,
    AngularFontAwesomeModule,
    HeaderModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    ComponentsModule
  ],
  providers: [
    CacheMapService,
    { provide: Cache, useClass: CacheMapService },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
