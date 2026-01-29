import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../core/services/data.service';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-post-form',
  standalone: false,
  template: `
    <h2 mat-dialog-title>New Post</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title">
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Message</mat-label>
          <textarea matInput formControlName="body" rows="4"></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid" (click)="save()">Publish</button>
    </mat-dialog-actions>
  `,
  styles: ['.full-width { width: 100%; margin-bottom: 10px; }']
})
export class PostFormComponent {
  form: FormGroup;
  private readonly ADMIN_EMAIL = 'admin@ntt.com';

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private dialogRef: MatDialogRef<PostFormComponent>
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  save() {
    if (this.form.invalid) return;

    const postData = this.form.value;

    this.service.getUsers(1, 10).pipe(
      switchMap(users => {
        const existingAdmin = users.find(u => u.email === this.ADMIN_EMAIL);
        
        if (existingAdmin) {
          return of(existingAdmin);
        } else {
          return this.service.createUser({
            name: 'Admin NTT',
            email: this.ADMIN_EMAIL,
            gender: 'male',
            status: 'active'
          });
        }
      }),
      switchMap(adminUser => {
        return this.service.createPost(adminUser.id, postData);
      })
    ).subscribe({
      next: (newPost) => this.dialogRef.close(newPost),
      error: () => alert('Error during post publication.')
    });
  }
}