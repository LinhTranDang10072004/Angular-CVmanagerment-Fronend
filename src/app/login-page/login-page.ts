import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPage {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: res => {
        localStorage.setItem('user', JSON.stringify(res));
       
        if (res.role === 'Admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (res.role === 'Recruiter') {
          this.router.navigate(['/recruiter/dashboard']);
        } else {
          this.router.navigate(['/user/home']);
        }
      },
      error: err => {
        this.error = err?.error?.message ?? 'Đăng nhập thất bại';
      }
    });
  }
}
