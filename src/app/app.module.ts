import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { SdkFeatureListComponent } from './sdk-feature-list/sdk-feature-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateSpaceComponent } from './Functionalities/create-space/create-space.component';
import { SinglePartyCallComponent } from './Functionalities/single-party-call/single-party-call.component';

import { AppGuard } from './app.guard';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AboutComponent,
  },
  {
    path: 'createSpace',
    canActivate: [AppGuard],
    component: CreateSpaceComponent,
  },
  {
    path: 'singlePartyCall',
    canActivate: [AppGuard],
    component: SinglePartyCallComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SdkFeatureListComponent,
    CreateSpaceComponent,
    SinglePartyCallComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
