
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    PaginationComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    PaginationComponent,
    SearchComponent
  ]
})
export class SharedModule { }
