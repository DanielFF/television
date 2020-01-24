
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowsComponent } from './shows.component';

const showsRoutes: Routes = [
  { path: 'shows', component: ShowsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(showsRoutes)
  ],
  exports: [RouterModule]
})
export class ShowsRoutingModule { }
