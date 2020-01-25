
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { ShowsRoutingModule } from './shows-routing-module';
import { SharedModule } from './../shared/shared.module';

import { ShowsListComponent } from './components/shows-list/shows-list.component';
import { ShowItemComponent } from './components/show-item/show-item.component';
import { ShowsComponent } from './shows.component';

import { ShowsEffects } from './effects/shows.effects';

import { ShowsService } from './services/shows.service';

import * as fromShowsReducer from './reducers';

@NgModule({
  declarations: [
    ShowsComponent,
    ShowsListComponent,
    ShowItemComponent
  ],
  imports: [
    CommonModule,
    ShowsRoutingModule,
    StoreModule.forFeature(fromShowsReducer.showsFeatureKey, fromShowsReducer.reducer),
    EffectsModule.forFeature([ShowsEffects]),
    SharedModule
  ],
  providers: [
    ShowsService
  ]
})
export class ShowsModule { }
