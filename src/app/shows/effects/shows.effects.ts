import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { HttpService } from './../../services/http.service';

@Injectable()
export class ShowsEffects {

    loadShows$ = createEffect(() => this.actions$.pipe(
        ofType('[Shows] Begin request'),
        mergeMap(() => this.httpService.get('http://api.tvmaze.com/shows')
            .pipe(
                map((shows) => ({ type: '[Shows] Set data', shows }),
                catchError(() => EMPTY)
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private httpService: HttpService
    ) { }
}