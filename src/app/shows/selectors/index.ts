import { createSelector, createFeatureSelector } from '@ngrx/store';

import { showsFeatureKey, State } from './../reducers/index';

export const selectShowsState = createFeatureSelector<State>(showsFeatureKey);

export const selectCurrentPageShows = createSelector(
  selectShowsState,
  (state: State) => state.pages[state.currentPage]
);

export const selectIsLoadingShows = createSelector(
  selectShowsState,
  (state: State) => state.isLoading
);