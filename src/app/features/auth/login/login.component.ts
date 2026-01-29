import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = new FormGroup({
    token: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  isTokenInvalid = false;

  constructor(
    private router: Router, 
    private dataService: DataService 
  ) {}

  login(): void {
    if (this.form.valid) {
      this.isTokenInvalid = false;
      
      const token = this.form.value.token as string;
      
      localStorage.setItem('token', token);

      this.dataService.getUsers(1, 1).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: () => {
          localStorage.removeItem('token');
          
          this.isTokenInvalid = true; 
          this.form.get('token')?.setErrors({ 'serverError': true });
        }
      });
    }
  }
}