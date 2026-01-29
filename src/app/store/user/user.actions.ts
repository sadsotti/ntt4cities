import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/api.models';

export const loadUsers = createAction(
  '[User List] Load Users',
  props<{ page: number, name?: string }>()
);

export const loadUsersSuccess = createAction(
  '[User List] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User List] Load Users Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[User List] Delete User',
  props<{ id: number }>()
);

export const deleteUserSuccess = createAction(
  '[User List] Delete User Success',
  props<{ id: number }>()
);

export const deleteUserFailure = createAction(
  '[User List] Delete User Failure',
  props<{ error: any }>()
);