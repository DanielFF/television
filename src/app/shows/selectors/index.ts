import { createSelector, createFeatureSelector } from '@ngrx/store';

import { showsFeatureKey, State } from './../reducers/index';
import { selectQueryParams } from 'src/app/app/selectors';

export const selectShowsState = createFeatureSelector<State>(showsFeatureKey);

export const selectShowsPaginatedList = createSelector(
  selectShowsState,
  selectQueryParams,
  (state: State, queryParams: any) => state.pages[queryParams.page || 1]
);

export const selectShowsConfiguration = createSelector(
  selectShowsState,
  (state: State) => ({
    pagesCount: state.pagesCount,
    isLoading: state.isLoading
  })
);
