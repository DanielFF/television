import { Observable } from 'rxjs';
import { Show } from './models/index';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromFeature from './selectors';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent implements OnInit {

  shows$: Observable<Show[]> = this.store.select(fromFeature.selectShowsList)

  constructor(private store: Store<{ shows: Show[] }>) { }

  ngOnInit() {
    this.store.dispatch({ type: '[Shows] Begin request' })
  }

}
