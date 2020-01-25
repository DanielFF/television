
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { ShowsModule } from './shows/shows.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './app/components/page-not-found/page-not-found.component';

import { AppEffects } from './app.effects';

import { StoreRouterConnectingModule, StoreRouterConfig, routerReducer } from '@ngrx/router-store';
import { StoreRouterSerializer } from './app/serializers/store-router.serializer';
import { routerReducerKey } from './app/reducers/router.reducer';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      [routerReducerKey]: routerReducer
    }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ShowsModule,
    EffectsModule.forRoot([AppEffects]),
    HttpClientModule,
    StoreRouterConnectingModule.forRoot(<StoreRouterConfig>{
      stateKey: routerReducerKey,
      serializer: StoreRouterSerializer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
