import { beginLoadingIndex, beginLoadingSearch } from './actions/index';
import { Observable, Subscription } from 'rxjs';
import { Show } from './models/index';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromFeature from './selectors';
import * as fromRoot from '../app/selectors';
import { State } from './reducers/index';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent implements OnInit, OnDestroy {

  activeSubscriptions = new Subscription()

  shows$: Observable<Show[]>

  isLoading = true
  currentPage: number
  pagesCount: number
  search: string

  constructor(
    private store: Store<State>,
    private router: Router) {

    this.pageChangedCallback = this.pageChangedCallback.bind(this);
    this.searchChangedCallback = this.searchChangedCallback.bind(this);
  }

  ngOnInit() {
    this.shows$ = this.store.pipe(select(fromFeature.selectShowsPaginatedList));

    const subscription1 = this.store.pipe(select(fromFeature.selectShowsConfiguration))
      .subscribe((configuration) => {
        this.isLoading = configuration.isLoading;
        this.pagesCount = configuration.pagesCount;
      });

    const subscription2 = this.store.pipe(select(fromRoot.selectQueryParams))
      .subscribe(({ page = 1, search = '' }: any) => {
        const isInitialLoad = !this.currentPage && !this.search;

        if (isInitialLoad) {
          this.beginLoadingIndexOrSearch(page, search);
        }

        this.currentPage = page;
        this.search = search;
      });

    this.activeSubscriptions.add(subscription1);
    this.activeSubscriptions.add(subscription2);
  }

  private changeQueryParams(page, search) {
    const urlTree = this.router.parseUrl(this.router.url);

    urlTree.queryParams['page'] = page;
    urlTree.queryParams['search'] = search;
    this.router.navigateByUrl(urlTree);
  }

  private beginLoadingIndexOrSearch(page, search) {
    const isSearching = !!search.length;

    if (isSearching) {
      this.store.dispatch(beginLoadingSearch({ search }));
    } else {
      this.store.dispatch(beginLoadingIndex({ page }));
    }
  }

  pageChangedCallback(page) {
    this.changeQueryParams(page, '');
    this.currentPage = page;
  }

  searchChangedCallback(search) {
    this.changeQueryParams(1, search);
    this.beginLoadingIndexOrSearch(1, search);
  }

  ngOnDestroy() {
    this.activeSubscriptions.unsubscribe();
  }

}
