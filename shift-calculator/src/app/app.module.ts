import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { FundamentalNgxCdkModule } from '@fundamental-ngx/cdk';
import {FdDatetimeModule, FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemingService, ThemingModule } from '@fundamental-ngx/core/theming';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FundamentalNgxCdkModule,
    FundamentalNgxCoreModule,
    FdDatetimeModule,
    BrowserAnimationsModule,
    ThemingModule.withConfig({ defaultTheme: 'sap_fiori_3_dark' }),
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
constructor(themingService: ThemingService) {
themingService.init();
}
}
