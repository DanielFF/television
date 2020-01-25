import { Observable, Subscription } from 'rxjs';
import { Show } from './models/index';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromFeature from './selectors';
import { State } from './reducers/index';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent implements OnInit, OnDestroy {

  shows$: Observable<Show[]>
  isLoading = true
  activeSubscriptions = new Subscription()

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.shows$ = this.store.pipe(select(fromFeature.selectCurrentPageShows));
    const subscription = this.store.pipe(select(fromFeature.selectIsLoadingShows))
      .subscribe(isLoading => this.isLoading = isLoading);

    this.activeSubscriptions.add(subscription);

    this.store.dispatch({ type: '[Shows] Begin request' });
  }

  ngOnDestroy() {
    this.activeSubscriptions.unsubscribe();
  }

}
