import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../../../core/services/data.service';
import { of } from 'rxjs';
import { User } from '../../../core/models/api.models';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DataService', ['getUsers']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ 
        ReactiveFormsModule, 
        SharedModule, 
        NoopAnimationsModule, 
        MatSnackBarModule,
        RouterTestingModule 
      ],
      providers: [
        { provide: DataService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    router = TestBed.inject(Router);
    localStorage.clear();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should save the token and navigate to /users on success', async () => {
    const navigateSpy = spyOn(router, 'navigate');
    
    const mockUser: User = { 
      id: 1, name: 'Mario Rossi', email: 'mario@rossi.it', gender: 'male', status: 'active' 
    };
    dataServiceSpy.getUsers.and.returnValue(of([mockUser]));

    const validToken = 'very_long_token_to_pass_validation';
    component.form.get('token')?.setValue(validToken);
    
    component.login();
    
    await fixture.whenStable();

    expect(localStorage.getItem('token')).toBe(validToken);
    expect(navigateSpy).toHaveBeenCalledWith(['/users']);
  });
});