import { Action, createReducer, on } from '@ngrx/store';

import { Show } from './../models/index';
import * as showsActions from '../actions';

export interface State {
    isLoading: boolean;
    shows: Show[];
}

const initialState: State = {
    isLoading: false,
    shows: []
};

const showsReducer = createReducer(
    initialState,
    on(showsActions.beginRequest, state => ({ ...state, isLoading: true })),
    on(showsActions.setData, (state, action) => ({ ...state, shows: action.shows })),
);

export function reducer(state: State | undefined, action: Action) {
    return showsReducer(state, action);
}

export const showsFeatureKey = 'shows';