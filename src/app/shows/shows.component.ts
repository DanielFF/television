import { beginRequest, setPage } from './actions/index';
import { Observable, Subscription } from 'rxjs';
import { Show } from './models/index';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import * as fromFeature from './selectors';
import { State } from './reducers/index';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent implements OnInit, OnDestroy {

  activeSubscription: Subscription

  shows$: Observable<Show[]>

  isLoading = true
  currentPage: number
  pagesCount: number
  search: string

  constructor(
    private store: Store<State>,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.pageChangedCallback = this.pageChangedCallback.bind(this);
    this.searchChangedCallback = this.searchChangedCallback.bind(this);
  }

  ngOnInit() {
    this.shows$ = this.store.pipe(select(fromFeature.selectShowsPaginatedList));

    this.activeSubscription = this.store.pipe(select(fromFeature.selectShowsConfiguration))
      .subscribe((configuration) => {
        this.isLoading = configuration.isLoading;
        this.currentPage = configuration.currentPage;
        this.pagesCount = configuration.pagesCount;
        this.search = configuration.search;
      });

    this.store.dispatch(beginRequest());
  }

  private changeQueryParams(page, search) {
    const urlTree = this.router.parseUrl(this.router.url);

    urlTree.queryParams['page'] = page;
    urlTree.queryParams['search'] = search;
    this.router.navigateByUrl(urlTree);
  }

  pageChangedCallback(page) {
    this.changeQueryParams(page, this.search);
  }

  searchChangedCallback(search) {
    this.changeQueryParams(1, search);
  }

  ngOnDestroy() {
    this.activeSubscription.unsubscribe();
  }

}
