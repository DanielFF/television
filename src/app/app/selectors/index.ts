import { createFeatureSelector } from '@ngrx/store';
import { State, routerReducerKey } from './../reducers/router.reducer';

export const selectRouterState = createFeatureSelector<State>(routerReducerKey);
