import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, concat, of, Observable } from 'rxjs';
import { map, mergeMap, catchError, concatMap, first } from 'rxjs/operators';
import { ShowsService } from './../services/shows.service';
import * as fromRootSelectors from '../../app/selectors';
import { State } from './../../app/reducers/router.reducer';
import { setData, beginRequest, setPage, setSearch } from './../actions/index';

@Injectable()
export class ShowsEffects {

  private oldQueryParams = {
    page: void 0,
    search: void 0
  };

  loadShows$ = createEffect(() => this.actions$.pipe(
    ofType('[Shows] Begin request'),
    mergeMap(() => this.showsService.getPaginatedShows()
      .pipe(
        map(({ pages, pagesCount }) => {
          return setData({
            pages,
            pagesCount,
            currentPage: 1
          })
        }),
        catchError(() => EMPTY)
      )
    ))
  );


  queryParamsChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType('@ngrx/router-store/navigated'),
      map(({ payload }) => {
        const { routerState } = payload;
        const { queryParams } = routerState;
        const { page, search } = queryParams;
        const isFirstVisit = !this.oldQueryParams.page;
        const searchChanged = this.oldQueryParams.search !== search;

        this.oldQueryParams = queryParams;

        if (isFirstVisit) {
          return setPage({ currentPage: page });
        } else if (searchChanged) {

          // TODO dispatch multiple actions from one effect
          // this.store.dispatch(setSearch(search));
          //return beginRequest();
          return setPage({ currentPage: page });
        } else {
          return setPage({ currentPage: page });
        }

      }))
  );

  constructor(
    private actions$: Actions,
    private showsService: ShowsService,
    private store: Store<State>
  ) { }
}


//{ type: '[Shows] Set data', }