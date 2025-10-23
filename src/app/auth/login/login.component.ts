import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: res => {
        console.log('Login response:', res); // Debug log
        const user = res?.user ?? res;
        const token = res?.token; // Lấy token từ response
        const role = String(user?.role ?? user?.roles?.[0] ?? '').toLowerCase();
        
        // Lưu cả user và token vào localStorage
        const userData = {
          ...user,
          token: token
        };
        localStorage.setItem('user', JSON.stringify(userData));
        this.auth.setLoggedInStatus(true); // Cập nhật trạng thái đăng nhập

        if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/']); // Điều hướng đến trang Home (/)
        }
      },
      error: err => {
        this.error = err?.error?.message ?? 'Đăng nhập thất bại';
      }
    });
  }
}