import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-user-form',
  standalone: false,
  template: `
    <h2 mat-dialog-title>New Citizen</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Gender</mat-label>
          <mat-select formControlName="gender">
            <mat-option value="male">Male</mat-option>
            <mat-option value="female">Female</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status">
            <mat-option value="active">Active</mat-option>
            <mat-option value="inactive">Inactive</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid" (click)="save()">Save</button>
    </mat-dialog-actions>
  `,
  styles: ['.full-width { width: 100%; margin-bottom: 10px; }']
})
export class UserFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private dialogRef: MatDialogRef<UserFormComponent>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['male', Validators.required],
      status: ['active', Validators.required]
    });
  }

  save() {
    if (this.form.valid) {
      this.service.createUser(this.form.value).subscribe(newUser => {
        this.dialogRef.close(newUser);
      });
    }
  }
}