import { Action, createReducer, on } from '@ngrx/store';

import { Show } from './../models/index';
import * as showsActions from '../actions';

export interface State {
  isLoading: boolean;
  pages: {
    pageNumber?: Show[]
  },
  currentPage: number,
  pagesCount: number,
  search: string
}

const initialState: State = {
  isLoading: false,
  pages: {},
  pagesCount: 0,
  currentPage: 1,
  search: ''
};

const showsReducer = createReducer(
  initialState,
  on(showsActions.beginRequest, state => ({
    ...state,
    isLoading: true
  })),
  on(showsActions.setData, (state, { pages, pagesCount, currentPage }) => ({
    ...state,
    pages,
    pagesCount,
    currentPage,
    isLoading: false
  })),
  on(showsActions.setPage, (state, { currentPage }) => ({
    ...state,
    currentPage
  })),
  on(showsActions.setSearch, (state, { search }) => ({
    ...state,
    search
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return showsReducer(state, action);
}

export const showsFeatureKey = 'shows';