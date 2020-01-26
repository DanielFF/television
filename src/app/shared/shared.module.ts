import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchComponent } from './components/search/search.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { SmartTrimPipe } from './pipes/smart-trim.pipe';
import { NoResultsComponent } from './components/no-results/no-results.component';

@NgModule({
  declarations: [
    PaginationComponent,
    SearchComponent,
    PageNotFoundComponent,
    SmartTrimPipe,
    NoResultsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    PaginationComponent,
    SearchComponent,
    PageNotFoundComponent,
    SmartTrimPipe,
    NoResultsComponent
  ]
})
export class SharedModule { }
