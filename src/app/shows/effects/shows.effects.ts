import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, filter } from 'rxjs/operators';
import { ShowsService } from './../services/shows.service';
import { setLoadedData, ACTION_TYPES } from './../actions/index';

@Injectable()
export class ShowsEffects {

  loadIndex$ = createEffect(() => this.actions$.pipe(
    ofType(ACTION_TYPES.BEGIN_LOADING_INDEX),
    mergeMap(() => this.showsService.getIndex()
      .pipe(
        map(({ pages, pagesCount }) => {
          return setLoadedData({
            pages,
            pagesCount
          })
        }),
        catchError(() => EMPTY)
      )
    ))
  );

  loadSearch$ = createEffect(() => this.actions$.pipe(
    ofType(ACTION_TYPES.BEGIN_LOADING_SEARCH),
    mergeMap((action: any) => this.showsService.getSearchResults(action.search)
      .pipe(
        map((pages) => {
          return setLoadedData({
            pages,
            pagesCount: 1
          })
        }),
        catchError(() => EMPTY)
      )
    ))
  );

  constructor(
    private actions$: Actions,
    private showsService: ShowsService
  ) { }
}