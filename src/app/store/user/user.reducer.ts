import { createReducer, on } from '@ngrx/store';
import { User } from '../../core/models/api.models';
import * as UserActions from './user.actions';

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,

  on(UserActions.loadUsers, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users: users
  })),

  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  on(UserActions.deleteUser, state => ({
    ...state,
    loading: true
  })),

  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    users: state.users.filter(user => user.id !== id)
  })),
  
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);