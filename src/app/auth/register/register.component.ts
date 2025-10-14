import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  fullName = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}
onRegister() {
  if (this.password !== this.confirmPassword) {
    this.error = 'Mật khẩu xác nhận không khớp';
    return;
  }

  if (!this.username || !this.email || !this.password || !this.fullName) {
    this.error = 'Vui lòng điền đầy đủ thông tin';
    return;
  }

  const payload = {
    username: this.username,
    email: this.email,
    password: this.password,
    fullName: this.fullName
  };

  this.auth.register(payload).subscribe({
    next: (res) => {
      console.log('Đăng ký thành công:', res);
      this.success = 'Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.';
      this.error = '';

      // Reset form
      this.username = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.fullName = '';
       this.router.navigate(['/auth/login']);
    },
    error: (err) => {
      console.error('Lỗi khi đăng ký:', err);
      this.error = err.error?.message || 'Đăng ký thất bại, vui lòng thử lại!';
      this.success = '';
    }
  });
}

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
