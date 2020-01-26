import { Action, createReducer, on } from '@ngrx/store';

import { Show } from './../models/index';
import * as showsActions from '../actions';

export interface State {
  isLoading: boolean;
  pages: {
    pageNumber?: Show[]
  },
  pagesCount: number
}

const initialState: State = {
  isLoading: false,
  pages: {},
  pagesCount: 0
};

const showsReducer = createReducer(
  initialState,
  on(showsActions.beginLoadingIndex, state => ({
    ...state,
    isLoading: true
  })),
  on(showsActions.beginLoadingSearch, state => ({
    ...state,
    isLoading: true
  })),
  on(showsActions.setLoadedData, (state, { pages, pagesCount }) => ({
    ...state,
    pages,
    pagesCount,
    isLoading: false
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return showsReducer(state, action);
}

export const showsFeatureKey = 'shows';