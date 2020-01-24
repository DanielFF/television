import { Show } from './../models/index';
import { createAction, props } from '@ngrx/store';

export const beginRequest = createAction(
    '[Shows] Begin request'
);

export const setData = createAction(
    '[Shows] Set data',
    props<{ shows: Show[] }>()
);