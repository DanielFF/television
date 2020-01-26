import { createAction, props } from '@ngrx/store';

export const ACTION_TYPES = {
  BEGIN_LOADING_INDEX: '[Shows] Begin loading index',
  BEGIN_LOADING_SEARCH: '[Shows] Begin loading search',
  SET_LOADED_DATA: '[Shows] Set loaded data',
  SET_INDEX_PAGE: '[Shows] Set index page'
};

export const beginLoadingIndex = createAction(
  ACTION_TYPES.BEGIN_LOADING_INDEX,
  props<{
    page: number
  }>()
);

export const beginLoadingSearch = createAction(
  ACTION_TYPES.BEGIN_LOADING_SEARCH,
  props<{
    search: string
  }>()
)

export const setLoadedData = createAction(
  ACTION_TYPES.SET_LOADED_DATA,
  props<{
    pages: {},
    pagesCount: number
  }>()
);