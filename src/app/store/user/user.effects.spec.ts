import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { UserEffects } from './user.effects';
import { DataService } from '../../core/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Action } from '@ngrx/store';

describe('UserEffects', () => {
  let actions$: Observable<Action> = of({ type: 'INIT' });
  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        { 
          provide: DataService, 
          useValue: { getUsers: () => of([]) } 
        }
      ]
    });

    effects = TestBed.inject(UserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});