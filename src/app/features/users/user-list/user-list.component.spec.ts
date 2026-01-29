import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { DataService } from '../../../core/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    const dataServiceMock = {
      getUsers: () => of([{ id: 1, name: 'Mario', email: 'm@m.it', status: 'active', gender: 'male' }])
    };

    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: MatDialog, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should load users on init', () => {
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].name).toBe('Mario');
  });

  it('should apply search filter', () => {
    const event = { target: { value: 'MARIO ' } } as any;
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('mario');
  });

  it('should increment page when changePage is called', () => {
    component.currentPage = 1;
    component.changePage(1);
    expect(component.currentPage).toBe(2);
  });

  it('should reset page when page size changes', () => {
    component.currentPage = 5;
    component.onPageSizeChange(20);
    expect(component.currentPage).toBe(1);
    expect(component.pageSize).toBe(20);
  });
});