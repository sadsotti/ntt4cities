import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    const routerMock = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerMock }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('should allow access if token is present', () => {
    localStorage.setItem('token', 'test-token');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should deny access and redirect to login if token is missing', () => {
    expect(guard.canActivate()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});