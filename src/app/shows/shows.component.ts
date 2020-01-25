import { beginRequest, setPage } from './actions/index';
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
  currentPage: number
  pagesCount = 20

  constructor(private store: Store<State>) { 
    this.onPageChanged = this.onPageChanged.bind(this);
  }

  ngOnInit() {
    this.shows$ = this.store.pipe(select(fromFeature.selectCurrentPageShows));
    const loadingSubscription = this.store.pipe(select(fromFeature.selectIsLoadingShows))
      .subscribe(isLoading => this.isLoading = isLoading);
    const pageConfigSubscription = this.store.pipe(select(fromFeature.selectPageConfigShows))
      .subscribe(({ currentPage, pagesCount }) => {
        this.currentPage = currentPage;
        this.pagesCount = pagesCount;
      });

    this.activeSubscriptions.add(loadingSubscription);
    this.activeSubscriptions.add(pageConfigSubscription);

    this.store.dispatch(beginRequest());
  }

  onPageChanged(currentPage) {
    console.log(currentPage);
    this.store.dispatch(setPage({currentPage}));
  }

  ngOnDestroy() {
    this.activeSubscriptions.unsubscribe();
  }

}
