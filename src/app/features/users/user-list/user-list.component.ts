import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../../../core/services/data.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../../../core/models/api.models';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'gender', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  loading$ = new BehaviorSubject<boolean>(true);

  pageSize = 10;
  currentPage = 1;

  constructor(
    private service: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading$.next(true);
    this.service.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading$.next(false);
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.loading$.next(false);
      }
    });
  }

  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.currentPage = 1;
    this.loadUsers();
  }

  changePage(delta: number) {
    this.currentPage += delta;
    if (this.currentPage < 1) this.currentPage = 1;
    this.loadUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.service.deleteUser(user.id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);
      });
    }
  }
}