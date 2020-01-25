import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import { ShowsService } from './../services/shows.service';

@Injectable()
export class ShowsEffects {

  loadShows$ = createEffect(() => this.actions$.pipe(
    ofType('[Shows] Begin request'),
    mergeMap(() => this.showsService.getMockedList()
      .pipe(
        map(({ pages, pagesCount }) => {
          return { type: '[Shows] Set data', pages, pagesCount, currentPage: 0 }
        }),
        catchError(() => EMPTY)
      )
    ))
  )

  constructor(
    private actions$: Actions,
    private showsService: ShowsService
  ) { }
}