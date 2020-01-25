import { createSelector, createFeatureSelector } from '@ngrx/store';

import { showsFeatureKey, State } from './../reducers/index';

export const selectShowsState = createFeatureSelector<State>(showsFeatureKey);

export const selectShowsPaginatedList = createSelector(
  selectShowsState,
  (state: State) => state.pages[state.currentPage]
);

export const selectShowsConfiguration = createSelector(
  selectShowsState,
  (state: State) => ({
    currentPage: state.currentPage,
    pagesCount: state.pagesCount,
    isLoading: state.isLoading,
    search: state.search
  })
);
