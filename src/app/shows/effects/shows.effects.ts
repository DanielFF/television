import { setData } from './../actions/index';
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
          return setData({
            pages, 
            pagesCount, 
            currentPage: 1
          })
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


//{ type: '[Shows] Set data', }