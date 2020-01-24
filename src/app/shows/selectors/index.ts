import { createSelector, createFeatureSelector } from '@ngrx/store';

import { showsFeatureKey, State } from './../reducers/index';

export const selectShowsState = createFeatureSelector<State>(showsFeatureKey);

export const selectShowsList = createSelector(
    selectShowsState,
    (state: State) => state.shows
);