import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowsRoutingModule } from './shows-routing-module';

import { ShowsListComponent } from './components/shows-list/shows-list.component';
import { ShowItemComponent } from './components/show-item/show-item.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchComponent } from './components/search/search.component';
import { ShowsComponent } from './shows.component';

@NgModule({
  declarations: [
    ShowsComponent,
    ShowsListComponent,
    ShowItemComponent,
    PaginationComponent,
    SearchComponent],
  imports: [
    CommonModule,
    ShowsRoutingModule
  ]
})
export class ShowsModule { }
