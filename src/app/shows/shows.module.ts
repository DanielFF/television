
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { ShowsRoutingModule } from './shows-routing-module';

import { ShowsListComponent } from './components/shows-list/shows-list.component';
import { ShowItemComponent } from './components/show-item/show-item.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchComponent } from './components/search/search.component';
import { ShowsComponent } from './shows.component';

import { ShowsEffects } from './effects/shows.effects';

import * as fromShowsReducer from './reducers';

@NgModule({
  declarations: [
    ShowsComponent,
    ShowsListComponent,
    ShowItemComponent,
    PaginationComponent,
    SearchComponent],
  imports: [
    CommonModule,
    ShowsRoutingModule,
    StoreModule.forFeature(fromShowsReducer.showsFeatureKey, fromShowsReducer.reducer),
    EffectsModule.forFeature([ShowsEffects])
  ]
})
export class ShowsModule { }
