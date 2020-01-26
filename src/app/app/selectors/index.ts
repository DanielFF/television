import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, routerReducerKey } from './../reducers/router.reducer';

export const selectRouterState = createFeatureSelector<State>(routerReducerKey);

export const selectQueryParams = createSelector(
  selectRouterState,
  (state) => state.state.queryParams
);
