import { Show } from './../models/index';
import { createAction, props } from '@ngrx/store';

export const beginRequest = createAction(
  '[Shows] Begin request'
);

export const setData = createAction(
  '[Shows] Set data',
  props<{
    pages: {},
    pagesCount: number,
    currentPage: number
  }>()
);

export const setPage = createAction(
  '[Shows] Set page',
  props<{
    currentPage: number
  }>()
);