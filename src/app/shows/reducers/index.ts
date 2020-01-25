import { Action, createReducer, on } from '@ngrx/store';

import { Show } from './../models/index';
import * as showsActions from '../actions';


// TODO ts types
export interface State {
  isLoading: boolean;
  pages: {},
  currentPage: number,
  pagesCount: number,
  search: string
}

const initialState: State = {
  isLoading: false,
  pages: {},
  pagesCount: 0,
  currentPage: 0,
  search: ''
};

const showsReducer = createReducer(
  initialState,
  on(showsActions.beginRequest, state => ({ ...state, isLoading: true })),
  on(showsActions.setData, (state, action) => ({
    ...state,
    pages: action.pages,
    pagesCount: action.pagesCount,
    currentPage: action.currentPage,
    isLoading: false
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return showsReducer(state, action);
}

export const showsFeatureKey = 'shows';