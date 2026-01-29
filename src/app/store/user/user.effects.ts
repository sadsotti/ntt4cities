import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { DataService } from '../../core/services/data.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private dataService = inject(DataService);

  loadUsers$ = createEffect(() => this.actions$.pipe(
  ofType(UserActions.loadUsers),
  mergeMap(action => 
    this.dataService.getUsers(action.page, undefined, action.name).pipe(
      map(users => UserActions.loadUsersSuccess({ users })),
      catchError(error => of(UserActions.loadUsersFailure({ error })))
    )
  )
));

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.deleteUser),
    mergeMap(action => this.dataService.deleteUser(action.id).pipe(
      map(() => UserActions.deleteUserSuccess({ id: action.id })),
      catchError(error => of(UserActions.deleteUserFailure({ error })))
    ))
  ));
}